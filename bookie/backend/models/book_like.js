module.exports = (sequelize, DataTypes) => {
  const BookLike = sequelize.define(
    "BookLike",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "book_likes",
    }
  );
};
