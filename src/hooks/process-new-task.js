// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data, params } = context;

    data['created'] = new Date();
    data['created_by'] = params.user._id;

    data['status'] = 'Not Started';

    return context;
  };
};
