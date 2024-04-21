require("dotenv").config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const { ObjectId } = require('mongodb');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs/promises');
const User = require("../models/users");


mongoose.connect(process.env.DB_URL, {});

const conn = mongoose.createConnection(process.env.DB_URL);

conn.once("open", function () {
    console.log("Opened connection to insert test data....");
});

const seedUser = async (email, password, name) => {
    await User.deleteOne({ email });
    // Send form data with axios
    const response = await axios.post(process.env.BASE_URL+'/api/auth/register', {email, password, name});
    return { id: response.data.userId, name, email }
}

const seedSectionImage = async (imagePath, section, userId) => {
    const image = await fs.readFile(imagePath);

    // Create a form and append image with additional fields
    const form = new FormData();
    form.append('contentType','image/png');
    form.append('file', image, 'testimage.jpg');

    // Send form data with axios
    const response = await axios.post(process.env.BASE_URL+'/api/upload', form, {
        headers: {},
    });
    return { section, userId, id: response.data.id, name: response.data.name }
}

module.exports  = { seedSectionImage, seedUser };