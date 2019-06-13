const express = require("express")
const router = express.Router()

const commons = require("vrenetic-nodejs-common")
const checkPermissions = commons.middlewares.permissionsMiddleware
const { ok } = commons.core.responses
const scopes = commons.constants.scopes.clusterManager

router.get("/", checkPermissions(scopes.getStatuses), function process(req, res, next) {
  return ok(res, {})
})

module.exports = router
