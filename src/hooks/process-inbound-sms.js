// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data, app } = context;
    data['deleted'] = false;
    data['folder'] = 'inbox';
    data['read'] = false;
    data['created'] = new Date();
    // ETL Message
    console.log(data);
    const message = await app.service('messages').create(data);
    // console.log(message);
    return context;
  };
};
