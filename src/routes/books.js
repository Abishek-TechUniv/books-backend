const rp = require('request-promise');
const constants = require('../constants');

module.exports = [
  {
    path: '/books',
    method: 'GET',
    handler: (request, reply) => {
      rp({
        method: 'GET',
        url: constants.api1,
      }).then(result => reply(result).code(200));
    },
  },
];
