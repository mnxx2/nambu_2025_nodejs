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
        defaultValue: "",
      },
      publisher: {
        type: DataTypes.STRING,
      },
      isbn: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      thumbnail: {
        type: DataTypes.STRING,
      },
      contents: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "books",
    }
  );
};
