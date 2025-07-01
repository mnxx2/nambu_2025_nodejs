module.exports = (sequelize, DataTypes) => {
  const BookShelf = sequelize.define(
    "BookShelf",
    {
      status: {
        type: DataTypes.ENUM("completed", "reading", "wantToRead"),
        defaultValue: "completed",
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      bookreport: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    { tableName: "bookshelves" }
  );
};
