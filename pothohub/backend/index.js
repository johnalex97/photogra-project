require("dotenv").config();
const mongoose = require('mongoose');
const seed = require('./seeddata/index');
const upload = require("./middleware/upload");
const express = require("express");
const app = express();
const Grid = require("gridfs-stream");
const PORT = process.env.PORT || 5000;
var mongo = require('mongodb');
const { ObjectId } = require('mongodb');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const conn = mongoose.createConnection(process.env.DB_URL);

var gfs;

conn.once("open", function () {
    console.log("Opened connection....");
    gfs = Grid(conn.db, mongo);
    gfs.collection("photos");
});


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
      res.json(sections);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

//Seed the database
seed();

//Image upload
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
    res.send({
      message: "Uploaded",
      id: req.file.id,
      name: req.file.filename,
      contentType: req.file.contentType,
    })
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

async function get_image_by(bucketName, filterObject){
  const bucket = new mongo.GridFSBucket(conn.db, { bucketName: bucketName });
  const cursor = bucket.find(filterObject);
  let metadata = new Map();
  for await (const doc of cursor) {
    metadata.set('uploadDate', doc.uploadDate );
    metadata.set('Content-Type', doc.contentType );
  }
  return { metadata, bucket };
}

// app.get("/api/images/:id", async (req, res) => {
//   try {
//     const _ID = req.params.id;
//     let { metadata, bucket } = await get_image_by('photos', { id: _ID});
//     res = Object.assign(res, metadata)
//     bucket.openDownloadStream(new ObjectId(_ID))
//             .pipe(res);
//   } catch (error) {
//       console.error(error);
//       res.send("images not found");
//   }
// });

app.get("/api/images/:name", async (req, res) => {
  try {
    const NAME = req.params.name;
    let { metadata, bucket } = await get_image_by('photos', {filename: NAME});
    res = Object.assign(res, metadata)
    bucket.openDownloadStreamByName(NAME)
            .pipe(res);
  } catch (error) {
      console.error(error);
      res.send("images not found");
  }
});