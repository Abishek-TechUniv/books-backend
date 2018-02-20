
module.exports = (sequelize, DataTypes) => {
  const likes = sequelize.define('likes', {
    bookId: DataTypes.INTEGER,
    liked: DataTypes.BOOLEAN,
  }, {});
  likes.associate = function (models) {
    // associations can be defined here
  };
  return likes;
};
