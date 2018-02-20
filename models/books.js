

module.exports = (sequelize, DataTypes) => {
  const books = sequelize.define('books', {
    bookId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    rating: DataTypes.FLOAT,
  }, {});
  books.associate = function (models) {
    // associations can be defined here
  };
  return books;
};
