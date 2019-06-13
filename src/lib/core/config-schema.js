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
  }
}

module.exports = schema
