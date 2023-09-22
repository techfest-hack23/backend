const MongoClient = require('mongodb').MongoClient;

module.exports = function (app) {
  const connection = app.get('mongodb');
  //const database = connection.substr(connection.lastIndexOf('/') + 1);
  const database = 'techfest';
  const mongoClient = MongoClient.connect(connection)
    .then(client => client.db(database))
    .catch(e => {
      console.log(e)
    })

  app.set('mongoClient', mongoClient);
};
