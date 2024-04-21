  // Schema for users of app
  const mongoose = require("mongoose");
  
  const SectionsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    largeImage: {
        type: String,
        required: true,
    },
    smallImage: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
});
const Sections = mongoose.model("Sections", SectionsSchema);

module.exports = Sections;