module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authors: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: [],
      },
      publisher: {
        type: DataTypes.STRING,
      },
      isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      thumbnail: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "books",
    }
  );
};
