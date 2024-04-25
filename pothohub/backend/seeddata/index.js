//Seeding
process.env.DEBUG = 'mongo-seeding';
const { Seeder } = require('mongo-seeding');
const sections = require('./models/sections/sections');
const path = require('path');
const { faker } = require('@faker-js/faker');
const { seedSectionImage } = require('./insert');

async function insertImage(userId, userName) {
  let images = {
    portraits: [],
    food: [],
    products: [],
    nature: []
  };
  let portraitImagesNames = [];
  for (let i = 1; i <= 18; i++) {
    portraitImagesNames.push(`R${i}.jpg`);
  }
  const promises = portraitImagesNames.map(async (imgname) => {
    return await seedSectionImage(`public/media/portraits/${imgname}`, 'portraits', userId, userName, faker.lorem.words({ min: 1, max: 2 }));
  })
  images.portraits = await Promise.all(promises);

  //Food
  let foodImagesNames = [];
  for (let i = 1; i <= 19; i++) {
    foodImagesNames.push(`a${i}.jpg`);
  }

  const promisesFood = foodImagesNames.map(async (imgname) => {
    return await seedSectionImage(`public/media/food/${imgname}`, 'food', userId, userName, faker.lorem.words({ min: 1, max: 2 }));
  });
  images.food = await Promise.all(promisesFood);

  //Products
  let productsImagesNames = [];
  for (let i = 1; i <= 17; i++) {
    productsImagesNames.push(`P${i}.jpg`);
  }

  const promisesProducts = productsImagesNames.map(async (imgname) => {
    return await seedSectionImage(`public/media/products/${imgname}`, 'products', userId, userName, faker.lorem.words({ min: 1, max: 2 }));
  });
  images.products = await Promise.all(promisesProducts);

   //Nature
   let productsNature = [];
   for (let i = 1; i <=23; i++) {
    productsNature.push(`N${i}.jpg`);
   }

   const promisesNature = productsNature.map(async (imgname) => {
     return await seedSectionImage(`public/media/nature/${imgname}`, 'nature', userId, userName, faker.lorem.words({ min: 1, max: 2 }));
   });
   images.nature = await Promise.all(promisesNature);

  return images;
}

const config = {
  database: {
    host: '127.0.0.1',
    port: 27017,
    name: 'Photohub',
  },
  dropCollections: true,
};

const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(
  path.resolve('./seeddata/models/'),
  {
    transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
  },
);

const seed = async (imagesData) => {
  const sections = collections.find((col) => col.name == 'sections');

  sections.documents.forEach((sec) => {
    if (sec.name == 'portraits'){
      sec.images = imagesData['portraits'];
    }
  });

  sections.documents.forEach((sec) => {
    if (sec.name == 'food'){
      sec.images = imagesData['food'];
    }
  });

  sections.documents.forEach((sec) => {
    if (sec.name == 'products'){
      sec.images = imagesData['products'];
    }
  });

  sections.documents.forEach((sec) => {
    if (sec.name == 'nature'){
      sec.images = imagesData['nature'];
    }
  });

  seeder
    .import(collections)
    .then(() => {
      console.log('Success seeding');
    })
    .catch(err => {
      console.log('Error', err);
    });
}

module.exports = { seed, insertImage };