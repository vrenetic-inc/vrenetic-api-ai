const commons = require("vrenetic-nodejs-common")
const { cuRoles, resources } = commons.constants

const apiPrefixes = {
  v1: "/v1",
  health: "/health",
}

const apiResources = {
  AINN: "/ai/nn/",
}

module.exports = {
  apiPrefixes,
  apiResources,
  cuRoles,
  resources
}
