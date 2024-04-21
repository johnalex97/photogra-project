//require("dotenv").config();
const mongoose = require('mongoose');
const { seed, insertImage } = require('./seeddata/index');
const { seedUser } = require('./seeddata/insert');
const upload = require("./middleware/upload");
const express = require("express");
const app = express();
const Grid = require("gridfs-stream");
const PORT = process.env.PORT || 5000;
var mongo = require('mongodb');
const { ObjectId } = require('mongodb');
const jwt = require("jsonwebtoken");
const User = require("./models/users");
const Sections = require("./models/sections"); // Create the Sections model
const bcrypt = require("bcrypt");
var bodyParser = require('body-parser')

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
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

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



app.get("/api/sections", async (req, res) => {
    try {
      const sections = await Sections.find();
      res.json(sections);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  app.get("/api/sections/:name", async (req, res) => {
    try {
      const section = await Sections.findOne({ name: req.params.name });
      res.json(section);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });


//Image upload


app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (req.file === undefined) return res.send("you must select a file.");
    if(req.fileValidationError) {
      return res.status(400).json({
        message: req.fileValidationError,
      });
    }
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
    let { metadata, bucket } = await get_image_by('photos', { filename: NAME });
    res = Object.assign(res, metadata)
    bucket.openDownloadStreamByName(NAME)
            .pipe(res);
  } catch (error) {
      console.error(error);
      res.send("images not found");
  }
});

//Get images by user id 
app.post("/api/user/images/", async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.body.userId;
    const sections = await Sections.find({});
    const sectionsObj = JSON.parse(JSON.stringify(sections));

    const images = sectionsObj.map((seccion) => {
      return seccion.images.filter((img) => { return img.userId === userId});
    });

    console.log(images);
    res.json(images);
  } catch (error) {
      console.error(error);
      res.send(`images for user ${ userId } not found`);
  }
});

app.post("/api/auth/register", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    res.json({
      message: "User registered successfully",
      userId: savedUser._id,
      name:savedUser.name
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword)
    return res.status(400).send("Invalid emial or password.");

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  res.send({ token, username: user.name, id: user.id });
});

//Seed the databas
seedUser('pedro@email.com', '12345678', 'Pedro').then((userData) => {
  console.log('Tryingto seeding images');
  console.log(userData);
  insertImage(userData.id).then((res) => {
    console.log('Tryingto seeding images');
    seed(res);
    console.log('Success seeding images');
  })
  .catch(err => {
    console.log('Error seeding images', err);
  })
}).catch(err => {
  console.log('Error seeding user', err);
});
