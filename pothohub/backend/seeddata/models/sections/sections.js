const { getObjectId } = require('mongo-seeding');
const { BSON } = require('bson');
var randomstring = require("randomstring");

const sections = [
  {
    id: getObjectId(randomstring.generate(10)),
    name: 'portraits',
    largeImage: 'media/images/portraits/retratoSeccion.jpg',
    smallImage: 'media/images/portraits/retratoSeccion.jpg',
    images: [],
    creationDate: new Date(),
  },
  {
    id: getObjectId(randomstring.generate(10)),
    name: 'nature',
    largeImage: 'media/images/nature/natureSeccion.jpg',
    smallImage: 'media/images/nature/natureSeccion.jpg',
    images: [],
    creationDate: new Date(),
  },
  {
    id: getObjectId(randomstring.generate(10)),
    name: 'products',
    largeImage: 'media/images/products/prodcutosSeccion.jpg',
    smallImage: 'media/images/products/prodcutosSeccion.jpg',
    images: [],
    creationDate: new Date(),
  },
  {
    id: getObjectId(randomstring.generate(10)),
    name: 'food',
    largeImage: 'media/images/food/heroAlimentos.jpg',
    smallImage: 'media/images/food/heroAlimentos.jpg',
    images: [],
    creationDate: new Date(),
  },
];

module.exports = sections;