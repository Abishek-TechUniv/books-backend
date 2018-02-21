const models = require('../../models');

module.exports = [
  {
    path: '/likes',
    method: 'GET',
    handler: (request, reply) => {
      models.likes.findAll().then(data => reply(data));
    },
  },
  {
    path: '/books/{bookId}/like',
    method: 'POST',
    handler: (request, reply) => {
      const id = Number(request.params.bookId);
      models.books.findOne({
        where: {
          bookId: id,
        },
      }).then((book) => {
        if (book === null) reply("Can't find").code(404);
        return models.likes.findOrCreate({
          where: { bookId: book.bookId },
          defaults: { bookId: book.bookId, liked: true },
        });
      }).then(([bookLike, created]) => {
        if (!created && !bookLike.liked) {
          bookLike.updateAttributes({ liked: true });
        }
        return bookLike;
      }).then(result => reply(result.liked));
    },
  },
  {
    path: '/books/{bookId}/dislike',
    method: 'POST',
    handler: (request, reply) => {
      const id = Number(request.params.bookId);
      models.books.findOne({
        where: {
          bookId: id,
        },
      }).then((book) => {
        if (book === null) reply("Can't find").code(404);
        return models.likes.findOrCreate({
          where: { bookId: book.bookId },
          defaults: { bookId: book.bookId, liked: false },
        });
      }).then(([bookLike, created]) => {
        if (!created && !bookLike.liked) {
          bookLike.updateAttributes({ liked: false });
        }
        return bookLike;
      }).then(result => reply(result.liked));
    },
  },

];
