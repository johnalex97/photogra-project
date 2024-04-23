const { getObjectId } = require('mongo-seeding');
const { BSON } = require('bson');
var randomstring = require("randomstring");

const sections = [
  {
    id: getObjectId(randomstring.generate(10)),
    name: 'portraits',
    displayname:'Retratos',
    largeImage: 'media/images/portraits/retratoSeccion.jpg',
    smallImage: 'media/images/portraits/retratoSeccion.jpg',
    description: 'El retrato fotográfico es un género donde se reúnen toda una serie de iniciativas artísticas que giran en torno a la idea de mostrar las cualidades físicas o morales de las personas que aparecen en las imágenes fotográficas.',
    images: [],
    creationDate: new Date(),
  },
  {
    id: getObjectId(randomstring.generate(10)),
    name: 'nature',
    displayname:'Naturaleza',
    largeImage: 'media/images/nature/natureSeccion.jpg',
    smallImage: 'media/images/nature/natureSeccion.jpg',
    description: 'Algo',
    images: [],
    creationDate: new Date(),
  },
  {
    id: getObjectId(randomstring.generate(10)),
    name: 'products',
    displayname:'Productos',
    largeImage: 'media/images/products/prodcutosSeccion.jpg',
    smallImage: 'media/images/products/prodcutosSeccion.jpg',
    description: 'Algo',
    images: [],
    creationDate: new Date(),
  },
  {
    id: getObjectId(randomstring.generate(10)),
    name: 'food',
    displayname:'Alimentos',
    largeImage: 'media/images/food/heroAlimentos.jpg',
    smallImage: 'media/images/food/heroAlimentos.jpg',
    description: 'Algo',
    images: [],
    creationDate: new Date(),
  },
];

module.exports = sections;