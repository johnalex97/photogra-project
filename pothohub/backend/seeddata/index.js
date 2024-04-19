//Seeding
process.env.DEBUG = 'mongo-seeding';
const { Seeder } = require('mongo-seeding');
const sections = require('./models/sections/sections');
const path = require('path');
const seedSectionImage = require('./insert');

async function insertImage() {
  let images = {
    portraits: [],
    food: [],
    products: [],
    nature: []
  };
  let portraitImagesNames = ['p1.jpg', 'p2.jpg', 'p3.jpg', 'p4.jpg', 'p5.jpg'];
  const promises = portraitImagesNames.map(async (name) => {
    return await seedSectionImage(`public/media/${name}`, 'portraits');
  })
  images.portraits = await Promise.all(promises);
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
  const portraits = sections.documents.find((sec) => sec.name == 'portraits')
  portraits['images'] = imagesData['portraits'];
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