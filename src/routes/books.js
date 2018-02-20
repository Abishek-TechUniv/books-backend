const rp = require('request-promise');
const constants = require('../constants');

const joinBooksWithRatings = booksInput => new Promise((resolve, reject) => {
  const books = booksInput.map(book => ({
    bookId: book.id,
    author: book.Author,
    name: book.Name,
  }));

  const bookRatingPromiseArr = [];

  books.forEach((book) => {
    const ratingUrl = `${constants.api2}/${book.bookId}/`;
    const bookRatingPromise = rp({
      method: 'GET',
      url: ratingUrl,
    });
    bookRatingPromiseArr.push(bookRatingPromise);
  });

  Promise.all(bookRatingPromiseArr)
    .then((ratingObj) => {
      for (let i = 0; i < books.length; i += 1) {
        books[i].rating = JSON.parse(ratingObj[i]).rating;
      }
    })
    .then(() => { resolve(books); })
    .catch((reason) => { reject(new Error(reason.message)); });
});

const groupBooks = (books) => {
  const group = {};
  books.forEach((elem) => {
    if (group[elem.author] === undefined) { group[elem.author] = [elem]; }
    group[elem.author].push(elem);
  });
  return group;
};

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
];
