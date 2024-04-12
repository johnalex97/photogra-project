const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Photohub', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const express = require("express");
  const app = express();
  const PORT = process.env.PORT || 5000;
  var cors = require('cors');

  app.use(cors());
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const Users = require("./models/users"); // Create the Users model

app.get("/api/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

const Sections = require("./models/sections"); // Create the Sections model

app.get("/api/sections", async (req, res) => {
    try {
      const sections = await Sections.find();
      console.log(".....");
      console.log(sections);
      res.json(sections);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });