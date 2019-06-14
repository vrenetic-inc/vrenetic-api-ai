const vreneticAICli = require("../services/vrenetic-ai-cli")
const express = require("express")
const router = express.Router()
const commons = require("vrenetic-nodejs-common")
const { ok } = commons.core.responses

router.get("/", function process(req, res, next) {
  vreneticAICli.NNShowAll().then(data => {
    ok(res, { 
      "output": data[0].replace(/(\r\n|\n|\r)/gm, "")
    })
    next()
  }).catch(err => {
    console.log('cmd err', err)
    next()
  })
})

router.get("/:id", function process(req, res, next) {
  vreneticAICli.NNShowById(req.params.id).then(data => {
    ok(res, { 
      "output": data[0].replace(/(\r\n|\n|\r)/gm, "")
    })
    next()
  }).catch(err => {
    console.log('cmd err', err)
    next()
  })
})

router.post("/:id", function process(req, res, next) {
  vreneticAICli.NNRun(req.params.id, req.body).then(data => {
    ok(res, { 
      "output": data[0].replace(/(\r\n|\n|\r)/gm, "")
    })
    next()
  }).catch(err => {
    console.log('cmd err', err)
    next()
  })
})

module.exports = router
