// NOTE don't forget to set `null` as a default for required values

const schema = {
  servicePort: {
    doc: "Http port of the application",
    format: "port",
    default: 8110,
    env: "SERVICE_PORT",
  },
  logLevel: {
    doc: "Log level",
    format: ["trace", "debug", "info", "warn", "error", "fatal"],
    default: "info",
    env: "LOG_LEVEL",
  },
  jwtPublicKey: {
    doc: "JWT verification public key",
    format: "String",
    default: null,
    env: "JWT_VERIFICATION_KEY",
  },
  vreneticAICli: {
    doc: "VRenetic AI Cli tools",
    format: "String",
    default: "vrenetic-ai",
    env: "VRENETIC_AI_CLI_BINARY",
  },
  childrenMaxConcurrentInstaces: {
    doc: "Max number of concurrent instances for sub processes",
    format: "Number",
    default: 20,
    env: "CHILDREN_MAX_CONCURRENT_INSTANCES",
  }
}

module.exports = schema
