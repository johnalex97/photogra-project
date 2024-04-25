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
    description: 'Experimenta la diversidad de emociones y personalidades a través de nuestros retratos, donde cada mirada, gesto y expresión cuenta una historia única y reveladora del individuo retratado.',
    images: [],
    creationDate: new Date(),
  },
  {
    id: getObjectId(randomstring.generate(10)),
    name: 'nature',
    displayname:'Naturaleza',
    largeImage: 'media/images/nature/natureSeccion.jpg',
    smallImage: 'media/images/nature/natureSeccion.jpg',
    description: 'Sumérgete en paisajes cautivadores capturados en todo su esplendor natural, desde majestuosas montañas hasta serenos océanos, cada imagen es una invitación a explorar el mundo a través de los ojos del fotógrafo',
    images: [],
    creationDate: new Date(),
  },
  {
    id: getObjectId(randomstring.generate(10)),
    name: 'products',
    displayname:'Productos',
    largeImage: 'media/images/products/prodcutosSeccion.jpg',
    smallImage: 'media/images/products/prodcutosSeccion.jpg',
    description: 'Descubre la belleza intrínseca de los productos en nuestras imágenes cuidadosamente compuestas, donde cada detalle es resaltado para transmitir su calidad, diseño y singularidad.',
    images: [],
    creationDate: new Date(),
  },
  {
    id: getObjectId(randomstring.generate(10)),
    name: 'food',
    displayname:'Alimentos',
    largeImage: 'media/images/food/heroAlimentos.jpg',
    smallImage: 'media/images/food/heroAlimentos.jpg',
    description: 'Explora la deliciosa intersección entre gastronomía y arte visual con nuestra colección de fotografías de platos exquisitamente preparados, listos para despertar tus sentidos y tentar tu paladar',
    images: [],
    creationDate: new Date(),
  },
];

module.exports = sections;