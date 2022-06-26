const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
  app: {
    type: String,
    required: true,
  },
  start: {
    type: Number,
  },
  end: {
    type: Number,
  },
});

module.exports = mongoose.model("App", appSchema);
