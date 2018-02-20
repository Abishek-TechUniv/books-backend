const { joinBooksWithRatings, groupBooks } = require('../../src/helpers/books');

describe('test that joinBooksWithRatings', () => {
  test('should return a promise', () => {
    expect(joinBooksWithRatings([{}])).toBeInstanceOf(Promise);
  });

  test('should resolve the promise on then', (done) => {
    joinBooksWithRatings([
      {
        Author: 'J K Rowling',
        id: 2,
        Name: 'Harry Potter and the Chamber of Secrets (Harry Potter, #2)',
      }])
      .then((books) => {
        expect(books).toEqual([{
          author: 'J K Rowling',
          bookId: 2,
          name: 'Harry Potter and the Chamber of Secrets (Harry Potter, #2)',
          rating: 4.38,
        }]);
        done();
      });
  });
});

describe('test that groupBooks', () => {
  test('should return an object', () => {
    expect(groupBooks([{
      author: 'J K Rowling',
      bookId: 2,
      name: 'Harry Potter and the Chamber of Secrets (Harry Potter, #2)',
      rating: 4.38,
    }])).toBeInstanceOf(Object);
  });

  test('should return an object with keys as author names', () => {
    const groupedBooks = groupBooks([
      {
        author: 'J K Rowling',
        bookId: 2,
        name: 'Harry Potter and the Chamber of Secrets (Harry Potter, #2)',
        rating: 4.38,
      }, {
        bookId: 8,
        author: 'Sidney Sheldon',
        name: 'If Tomorrow Comes (Tracy Whitney Series, #1)',
        rating: 4.02,
      }]);
    expect(Object.keys(groupedBooks).sort())
      .toEqual(['J K Rowling', 'Sidney Sheldon']);
  });
});
