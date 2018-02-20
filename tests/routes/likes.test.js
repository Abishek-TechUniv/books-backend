const server = require('../../src/server');
const models = require('../../models');

beforeEach(() => models.books.create({
  bookId: 1,
  name: 'The Art of Computer Programming',
  author: 'Donald Knuth',
  rating: 9.8,
}));
afterEach(() =>
  models.likes.destroy({
    truncate: true,
    restartIdentity: true,
  })
    .then(() => models.books.destroy({
      truncate: true,
      restartIdentity: true,
    })));


describe('liking a book should return', () => {
  test('200 statusCode for successful request', (done) => {
    const request = {
      method: 'POST',
      url: '/books/1/like',
    };
    server.inject(request, (reply) => {
      expect(reply.statusCode).toBe(200);
      done();
    });
  });

  test('true for successful request', (done) => {
    const request = {
      method: 'POST',
      url: '/books/1/like',
    };
    server.inject(request, (reply) => {
      expect(reply.result).toEqual(true);
      done();
    });
  });
});

describe('disliking a book should return', () => {
  test('200 statusCode for successful request', (done) => {
    const request = {
      method: 'POST',
      url: '/books/1/dislike',
    };
    server.inject(request, (reply) => {
      expect(reply.statusCode).toBe(200);
      done();
    });
  });

  test('false for successful request', (done) => {
    const request = {
      method: 'POST',
      url: '/books/1/dislike',
    };
    server.inject(request, (reply) => {
      expect(reply.result).toEqual(false);
      done();
    });
  });
});

// describe('liking or disliking a non-existent book should return', () => {
//   test('404 statusCode for like', (done) => {
//     const request = {
//       method: 'POST',
//       url: '/books/13/like',
//     };
//     server.inject(request, (reply) => {
//       expect(reply.statusCode).toBe(404);
//       done();
//     });
//   });

//   test('Can\'t find for like', (done) => {
//     const request = {
//       method: 'POST',
//       url: '/books/13/like',
//     };
//     server.inject(request, (reply) => {
//       expect(reply.result).toBe('Can\'t find');
//       done();
//     });
//   });

//   test('404 statusCode for dislike', (done) => {
//     const request = {
//       method: 'POST',
//       url: '/books/13/dislike',
//     };
//     server.inject(request, (reply) => {
//       expect(reply.statusCode).toBe(404);
//       done();
//     });
//   });

//   test('Can\'t find for dislike', (done) => {
//     const request = {
//       method: 'POST',
//       url: '/books/13/dislike',
//     };
//     server.inject(request, (reply) => {
//       expect(reply.result).toBe('Can\'t find');
//       done();
//     });
//   });
// });
