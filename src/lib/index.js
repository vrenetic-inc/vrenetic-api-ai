const express = require("express")
const bodyParser = require("body-parser")
const vreneticCommon = require("vrenetic-nodejs-common")
const logger = vreneticCommon.core.logger
const middlewares = vreneticCommon.middlewares

const createNamespace = require("cls-hooked").createNamespace
const { apiPrefixes } = require("./constants/constants")
const router = require("./controllers/router")

const healthController = require("./controllers/health-controller")
const { promisify } = require("util")
const http = require("http")

class Application {
  /**
   * @param {convict} config
   */
  constructor(config) {
    this.loggerContextName = "loggerGlobalContext"
    this.config = config
    logger.configure(config.get("logLevel"), {
      appendersConfig: { stdout: 1 },
      contextName: this.loggerContextName,
      sessionContextKeys: ["requestId"],
    })
    this.log = logger.getLogger()
    this._started = false
  }

  async start() {
    if (this._started) {
      this.log.warn("App is already started")
      return
    }
    this.log.info("Starting app")
    this._setupProcessHandlers()
    const config = this.config
    const loggerSession = createNamespace("loggerGlobalContext")
    const jwtPublicKey = config.get("jwtPublicKey")
    const vreneticAICli = config.get("vreneticAICli")
    const appPort = config.get("servicePort")
    try {
      const app = express()
      app.use(middlewares.requestIdMiddleware)
      app.use(middlewares.loggerSessionMiddleware(this.loggerContextName))
      app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
      app.use(bodyParser.json({ limit: '10mb' }))
      app.use(middlewares.logRequestMiddleware([apiPrefixes.health]))
      // app.use(middlewares.authMiddleware(jwtPublicKey, [apiPrefixes.health]))
      app.use(apiPrefixes.v1, router)
      app.use(apiPrefixes.health, healthController)
      app.use(middlewares.errorHandlingMiddleware)
      app.use(middlewares.notFoundMiddleware)
      app.disable("x-powered-by")
      app.disable("etag")

      this.httpServer = http.createServer(app)
      const listenAsync = promisify(this.httpServer.listen)
      await listenAsync.call(this.httpServer, appPort)
      this.log.info("Listening on {port}", { port: appPort })

      this._started = true
    } catch (error) {
      this.log.fatal("Error during application initialization", error)
      process.exit(1)
    }
  }

  async close() {
    const timeoutPromise = ms => new Promise(resolve => setTimeout(resolve, ms))
    if (!this._started) {
      this.log.warn("App is not started")
      return
    }

    this._started = false
    this.log.info("Closing application")

    if (this.httpServer) {
      this.log.info("Closing http/ws servers")
      const closeAsync = promisify(this.httpServer.close)
      await closeAsync.call(this.httpServer)
      delete this.httpServer
    }
  }

  /**
   * @private
   */
  _setupProcessHandlers() {
    process.on("unhandledRejection", reason => {
      this.log.fatal("Unexpected rejection error. Shutdown the process", reason)
      process.emit("SIGTERM")
    })
    process.on("uncaughtException", error => {
      this.log.fatal("Unexpected runtime error. Shutdown the process", error)
      process.emit("SIGTERM")
    })
    process.on("warning", warning => {
      this.log.warn("Process warning", {
        name: warning.name,
        message: warning.message,
        stack: warning.stack,
      })
    })
    process.once("SIGINT", () => {
      process.emit("close", "SIGINT")
    })
    process.once("SIGTERM", () => {
      process.emit("close", "SIGTERM")
    })
    if (process.env.NODE_ENV === "development") {
      process.once("SIGUSR2", () => { // for nodemon
        process.emit("close", "SIGUSR2")
      })
    }
    process.on("close", async(originalEvent) => {
      await this.close()
      process.kill(process.pid, originalEvent)
    })
  }
}

module.exports = Application
