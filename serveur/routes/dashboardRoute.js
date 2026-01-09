const express = require("express");
const { authMiddleware } = require("../middlewares/authmiddleware");
const { dashboardOverviewController } = require("../controllers/dashboardController");

const router = express.Router();

router.get('/overview', authMiddleware, dashboardOverviewController)

module.exports = router;