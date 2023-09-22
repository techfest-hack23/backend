const MongoClient = require('mongodb').MongoClient;

module.exports = function (app) {
  const connection = app.get('mongodb');
  const database = connection.substr(connection.lastIndexOf('/') + 1);
  const mongoClient = MongoClient.connect(username='techfest23', password='Welcome1', host='docdb-2023-09-21-21-56-02.cluster-cnnexkzeq0db.us-east-1.docdb.amazonaws.com', port=27017)
    .then(client => client.db(database))
    .catch(e => {
      console.log(e)
    })

  app.set('mongoClient', mongoClient);
};
