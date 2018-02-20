const server = require('../../src/server');

describe('get details from /books', () => {
  test('should return 200  statusCode for successful request', (done) => {
    const request = {
      method: 'GET',
      url: '/notes',
    };
    server.inject(request, (reply) => {
      expect(reply.statusCode).toEqual(200);
      done();
    });
  });
});
