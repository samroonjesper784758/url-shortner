const ShortUniqueId = require("short-unique-id");
const URL = require("../models/url.model");
const uid = new ShortUniqueId({ length: 8 });

const handleGenerateShortUrl = async (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).json({ message: "Url is required" });
  }

  try {
    const newId = uid.rnd();
    await URL.create({
      shortId: newId,
      redirectUrl: url,
      visitedHistory: [],
    });
    return res.status(201).json({ short_id: newId });
  } catch (error) {
    console.log("error occur: ", error);
  }
};

const handleRedirectToUrl = async (req, res) => {
  const shortId = req.params.id;
  try {
    const result = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitedHistory: { timeStamp: new Date().toISOString() } } },
      { new: true }
    );

    if (!result) {
      return res.status(400).json({ message: "Url not found" });
    }
    return res.redirect(result.redirectUrl);
  } catch (error) {
    console.log("error occur while updating visitedHistory", error);
    res.status(500).json({ message: "Inter Server error" });
  }
};

const handleGetAnalyticsOfUrl = async (req, res) => {
  const shortId = req.params.id;
  const result = await URL.findOne({ shortId });
  if (!result) {
    return res.status(400).json({ message: "Url does not exist" });
  }

  return res.status(200).json({
    totalClicks: result.visitedHistory.length,
    analytics: result.visitedHistory,
  });
};

module.exports = {
  handleGenerateShortUrl,
  handleRedirectToUrl,
  handleGetAnalyticsOfUrl,
};
