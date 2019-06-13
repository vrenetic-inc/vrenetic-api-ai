const express = require("express")
const router = express.Router()

const commons = require("vrenetic-nodejs-common")
const { ok } = commons.core.responses

router.get("/", function process(req, res, next) { // health checks only mongo so far
  return ok(res, {})
})

module.exports = router
