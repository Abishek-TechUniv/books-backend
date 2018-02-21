const rp = require('request-promise');
const constants = require('../constants');
const models = require('../../models');

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

const joinBooksWithLikes = booksInput =>
  booksInput.map((book) => {
    book.liked = models.likes.findOrCreate({
      where: { bookId: book.bookId },
      defaults: { bookId: book.bookId, liked: false },
    }).then(likedBook => likedBook.like);
    return book;
  });

const groupBooks = (books) => {
  const group = {};
  books.forEach((elem) => {
    if (group[elem.author] === undefined) { group[elem.author] = [elem]; }
    group[elem.author].push(elem);
  });
  return group;
};

const insertBooks = (myBooks) => {
  models.books.destroy({ truncate: true })
    .then(() => models.books.bulkCreate(myBooks));
};

module.exports = {
  joinBooksWithRatings, groupBooks, insertBooks, joinBooksWithLikes,
};

