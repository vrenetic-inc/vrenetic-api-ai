const config = require("./lib/config")

const Application = require("./lib/index.js")
const application = new Application(config)
const doDbBootstrap = process.env.NODE_ENV !== "production"
application.start(doDbBootstrap)
