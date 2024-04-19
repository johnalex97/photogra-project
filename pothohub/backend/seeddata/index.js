  //Seeding
process.env.DEBUG = 'mongo-seeding';
const { Seeder } = require('mongo-seeding');
const sections = require('./models/sections/sections');
const path = require('path');

const config = {
    database: {
      host: '127.0.0.1',
      port: 27017,
      name: 'Photohub',
    },
    dropDatabase: true,
};

const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(
    path.resolve('./seeddata/models/'),
    {
      transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
    },
  );

const seed = async () => {
    seeder
    .import(collections)
    .then(() => {
      console.log('Success');
    })
    .catch(err => {
      console.log('Error', err);
    });
}

module.exports  = seed;