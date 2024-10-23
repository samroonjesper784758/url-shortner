const mongoose = require("mongoose");
const { isStringObject } = require("util/types");

const urlSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  redirectUrl: { type: String, required: true },
  visitedHistory: [{ timeStamp: { type: String } }],
});

const URL = mongoose.model("urls", urlSchema);

module.exports = URL;
