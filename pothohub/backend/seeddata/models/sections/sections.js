const { getObjectId } = require('mongo-seeding');
const { BSON } = require('bson');
const fs = require("fs");



const sections = [
  {
    id: getObjectId('portraits'),
    name: 'Portraits',
    //mainImage: portraitsImage,
    creationDate: new Date(),
  },
  {
    id: getObjectId('nature'),
    name: 'Nature',
    creationDate: new Date(),
  },
  {
    id: getObjectId('products'),
    name: 'Products',
    creationDate: new Date(),
  },
  {
    id: getObjectId('food'),
    name: 'Food',
    creationDate: new Date(),
  },
];

module.exports = sections;