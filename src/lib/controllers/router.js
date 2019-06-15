const express = require("express")
const router = express.Router()

const { apiResources } = require("../constants/constants")
const annController = require("./ai-ann-controller")
const workflowController = require("./ai-workflow-controller")

router.use(apiResources.AINN, annController)
router.use(apiResources.AIW, workflowController)

module.exports = router
