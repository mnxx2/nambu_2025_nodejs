module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: DataTypes.TEXT,
    },
    {
      tableName: "comments",
    }
  );

  Comment.associate = function (models) {
    // 관계 설정 - Post
    Comment.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
    });

    // 관계 설정 - User
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      as: "author",
    });
  };

  return Comment;
};
