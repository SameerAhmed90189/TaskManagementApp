const express = require("express");
const router = express.Router();

const auth = require("../middleware/authmiddleware");
const { getOverview, getTrends } = require("../controllers/analyticscontroller");

router.get("/overview", auth, getOverview);
router.get("/trends", auth, getTrends);

module.exports = router;
