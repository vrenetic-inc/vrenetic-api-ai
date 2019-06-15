const vreneticAICli = require("../services/vrenetic-ai-cli")
const express = require("express")
const router = express.Router()
const commons = require("vrenetic-nodejs-common")
const { ok } = commons.core.responses

router.get("/", function process(req, res, next) {
  vreneticAICli.WorkflowShow().then(data => {
    ok(res, { 
      "output": JSON.parse(data[0].replace(/(\r\n|\n|\r)/gm, ""))
    })
    next()
  }).catch(err => {
    console.log('cmd err', err)
    next()
  })
})

router.get("/:id", function process(req, res, next) {
  vreneticAICli.WorkflowShowById(req.params.id).then(data => {
    console.log(data[0].replace(/(\r\n|\n|\r)/gm, ""))
    ok(res, { 
      "output": JSON.parse(data[0].replace(/(\r\n|\n|\r)/gm, ""))
    })
    next()
  }).catch(err => {
    console.log('cmd err', err)
    next()
  })
})

router.post("/:id", function process(req, res, next) {
  vreneticAICli.workflowRunCommand(req.params.id, req.body).then(data => {
    ok(res, { 
      "output": JSON.parse(data[0].replace(/(\r\n|\n|\r)/gm, ""))
    })
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
  vreneticAICli.WorkflowRunBatch(req.params.id, req.body).then(data => {
    results = []
    for(var n = 0; n < data.length; n++) {
      results.push(JSON.parse(data[n][0].replace(/(\r\n|\n|\r)/gm, "")))
    }
    ok(res, {
      "output": results
    })
    next()
  }).catch(err => {
    console.log('cmd err', err)
    next()
  })
})

module.exports = router
