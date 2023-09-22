const { Service } = require('feathers-mongodb');

exports.Clients = class Clients extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('clients');
    });
  }
};
