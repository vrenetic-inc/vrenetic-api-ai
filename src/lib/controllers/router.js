const express = require("express")
const router = express.Router()

const { apiResources } = require("../constants/constants")
const statusesCtrl = require("./statuses-controller")

router.use(apiResources.Statuses, statusesCtrl)

module.exports = router
