const { Service } = require('feathers-mongodb');

exports.Providers = class Providers extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('providers');
    });
  }
};
