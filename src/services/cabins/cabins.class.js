const { Service } = require('feathers-mongodb');

exports.Cabins = class Cabins extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('cabins');
    });
  }
};
