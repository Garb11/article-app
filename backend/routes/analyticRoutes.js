const express = require("express");
const router = express.Router();
const { query } = require("express-validator");

const analyticController = require("../controllers/analyticController");

router.get(
  "/comments/",
  [
    query("dateFrom")
      .isISO8601()
      .withMessage("Invalid date format for dateFrom"),
    query("dateTo").isISO8601().withMessage("Invalid date format for dateTo"),
  ],
  analyticController.getCommentsAnalytics,
);

module.exports = router;
