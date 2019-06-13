const convict = require("convict")
const configSchema = require("./core/config-schema")

const config = convict(configSchema)
config.load({})
if (process.env.NODE_ENV !== "test") {
  config.validate({ allowed: "strict" })
}
module.exports = config
