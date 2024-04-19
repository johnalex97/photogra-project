const { getObjectId } = require('mongo-seeding');
const { BSON } = require('bson');
const fs = require("fs");



const sections = [
  {
    id: getObjectId('portraits'),
    name: 'Portraits',
    largeImage: 'media/images/portraits/retratoSeccion.jpg',
    smallImage: 'media/images/portraits/retratoSeccion.jpg',
    creationDate: new Date(),
  },
  {
    id: getObjectId('nature'),
    name: 'Nature',
    largeImage: 'media/images/nature/natureSeccion.jpg',
    smallImage: 'media/images/nature/natureSeccion.jpg',
    creationDate: new Date(),
  },
  {
    id: getObjectId('products'),
    name: 'Products',
    largeImage: 'media/images/products/prodcutosSeccion.jpg',
    smallImage: 'media/images/products/prodcutosSeccion.jpg',
    creationDate: new Date(),
  },
  {
    id: getObjectId('food'),
    name: 'Food',
    largeImage: 'media/images/food/heroAlimentos.jpg',
    smallImage: 'media/images/food/heroAlimentos.jpg',
    creationDate: new Date(),
  },
];

module.exports = sections;