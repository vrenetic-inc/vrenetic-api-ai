const vreneticAICli = require("../services/vrenetic-ai-cli")
const express = require("express")
const router = express.Router()

const commons = require("vrenetic-nodejs-common")
const { ok } = commons.core.responses

router.get("/", function process(req, res, next) {
  return ok(res, {})
})

router.get("/status", function process(req, res, next) {
  vreneticAICli.ANNStatus().then(data => {
    ok(res, {
      "system": "ok",
      "providers": {
        "vrenetic-ai-cli": {
          "version": data[0].replace(/(\r\n|\n|\r)/gm, "").split(' ')[1],
          "binary": vreneticAICli.binary
        }
      }
    })
    next()
  }).catch(err => {
    console.log('cmd err', err)
    next()
  })
})

module.exports = router
