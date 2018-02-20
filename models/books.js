'use strict';
module.exports = (sequelize, DataTypes) => {
  var books = sequelize.define('books', {
    bookId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    rating: DataTypes.FLOAT
  }, {});
  books.associate = function(models) {
    // associations can be defined here
  };
  return books;
};