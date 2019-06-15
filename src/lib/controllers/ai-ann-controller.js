const vreneticAICli = require("../services/vrenetic-ai-cli")
const express = require("express")
const router = express.Router()
const commons = require("vrenetic-nodejs-common")
const { ok, badRequest } = commons.core.responses

router.get("/", function process(req, res, next) {
  vreneticAICli.ANNShowAll().then(data => {
    response = JSON.parse(data[0].replace(/(\r\n|\n|\r)/gm, ""))
    ok(res, response)
    next()
  }).catch(err => {
    console.log('cmd err', err)
    next()
  })
})

router.get("/:id", function process(req, res, next) {
  vreneticAICli.ANNShowById(req.params.id).then(data => {
    response = JSON.parse(data[0].replace(/(\r\n|\n|\r)/gm, ""))
    ok(res, response)
    next()
  }).catch(err => {
    console.log('cmd err', err)
    next()
  })
})

router.post("/:id", function process(req, res, next) {
  vreneticAICli.ANNRun(req.params.id, req.body).then(data => {
    response = JSON.parse(data[0].replace(/(\r\n|\n|\r)/gm, ""))
    ok(res, response)
    next()
  }).catch(err => {
    console.log('cmd err', err)
    next()
  })
})

router.post("/:id/batch", function process(req, res, next) {
  if(req.body.length < 1) {
    badRequest(res)
    return next()
  }
  vreneticAICli.ANNRunBatch(req.params.id, req.body).then(data => {
    results = []
    for(var n = 0; n < data.length; n++) {
      results.push(JSON.parse(data[n][0].replace(/(\r\n|\n|\r)/gm, "")))
    }
    ok(res, results)
    next()
  }).catch(err => {
    console.log('cmd err', err)
    next()
  })
})

module.exports = router
