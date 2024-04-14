  // Schema for users of app
  const mongoose = require("mongoose");
  
  const SectionsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Sections", SectionsSchema);