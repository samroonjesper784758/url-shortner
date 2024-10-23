const express = require("express");
const {
  handleGenerateShortUrl,
  handleRedirectToUrl,
  handleGetAnalyticsOfUrl,
} = require("../controllers/url.controller");
const router = express.Router();

router.post("/", handleGenerateShortUrl);
router.get("/:id", handleRedirectToUrl);
router.get("/analytics/:id", handleGetAnalyticsOfUrl);

module.exports = router;
