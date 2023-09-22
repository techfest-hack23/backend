const { Service } = require('feathers-mongodb');

exports.Inbound = class Inbound extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('inbound');
    });
  }
};
