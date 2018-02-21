const rp = require('request-promise');
const constants = require('../constants');
const models = require('../../models');

const {
  joinBooksWithRatings, groupBooks, insertBooks, joinBooksWithLikes,
} = require('../helpers/books');

module.exports = [
  {
    path: '/books',
    method: 'GET',
    handler: (request, reply) => {
      rp({
        method: 'GET',
        url: constants.api1,
      }).then(result => JSON.parse(result))
        .then(booksObj => booksObj.books)
        .then(booksArr => joinBooksWithRatings(booksArr))
        .then(booksWithRatingsArr => groupBooks(booksWithRatingsArr))
        .then(groupedBooksArr => reply(groupedBooksArr).code(200))
        .catch(err => reply(err).code(501));
    },
  },
  {
    path: '/books',
    method: 'POST',
    handler: (request, reply) => {
      rp({
        method: 'GET',
        url: constants.api1,
      }).then(result => JSON.parse(result))
        .then(booksObj => booksObj.books)
        .then(booksArr => joinBooksWithRatings(booksArr))
        .then(booksArr => insertBooks(booksArr))
        .then(() => reply('Inserted Successfully').code(200))
        .catch(err => reply(err).code(501));
    },
  },
  {
    path: '/books/liked',
    method: 'GET',
    handler: (request, reply) => {
      models.books.findAll()
        .then(booksArr => joinBooksWithLikes(booksArr))
        .then(data => reply(data).code(200))
        .catch(err => reply(err).code(501));
    },
  },
];
