const express = require("express")
const router = express.Router()

const { apiResources } = require("../constants/constants")
const aiController = require("./ai-controller")

router.use(apiResources.AINN, aiController)

module.exports = router
