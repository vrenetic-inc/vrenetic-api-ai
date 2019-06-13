var Promise = require("bluebird")
var cmd = require('node-cmd')

const express = require("express")
const router = express.Router()

const commons = require("vrenetic-nodejs-common")
const { ok } = commons.core.responses

const asyncExecutor = Promise.promisify(cmd.get, { multiArgs: true, context: cmd })
const nnShowCommand = 'python3 /Users/kris/Projects/vrenetic-ai-cli/vrenetic-ai/src/vrenetic/ai.py nn-show --nn-print-all'

router.get("/", function process(req, res, next) {
  asyncExecutor(nnShowCommand).then(data => {
    ok(res, { 
      "output": data
    })
    next()
  }).catch(err => {
    console.log('cmd err', err)
    next()
  })
})

router.get("/:id", function process(req, res, next) {
  asyncExecutor(nnShowCommand + ' --nn-id ' + req.params.id).then(data => {
    ok(res, { 
      "output": data
    })
    next()
  }).catch(err => {
    console.log('cmd err', err)
    next()
  })
})

router.post("/", function process(req, res, next) {
  console.log(req);
  res.send(ok(res, {
    "well": "ok"
  }))
  next()
})

module.exports = router
