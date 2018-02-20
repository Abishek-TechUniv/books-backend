const server = require('../../src/server');

describe('get details from /books should return', () => {
  test('200 statusCode for successful request', (done) => {
    const request = {
      method: 'GET',
      url: '/books',
    };
    server.inject(request, (reply) => {
      expect(reply.statusCode).toEqual(200);
      done();
    });
  });

  test('an object containing authors as keys and array of their books as value', (done) => {
    expect.assertions(4);
    const request = {
      method: 'GET',
      url: '/books',
    };
    server.inject(request, (reply) => {
      const authorArr = reply.result[Object.keys(reply.result)[0]];
      expect(authorArr[0]).toHaveProperty('rating');
      expect(authorArr[0]).toHaveProperty('name');
      expect(authorArr[0]).toHaveProperty('author');
      expect(authorArr[0]).toHaveProperty('bookId');

      done();
    });
  });
});
