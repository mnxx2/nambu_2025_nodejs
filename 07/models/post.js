module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      fileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      attachments: {
        type: DataTypes.JSON, // 여러 파일 정보를 JSON으로 저장
        allowNull: true,
        defaultValue: [], // 자동으로 빈 배열 생성
      },
    },
    {
      tableName: "posts",
    }
  );

  // 관계 생성
  // models에는 생성한 db가 들어온다
  Post.associate = function (models) {
    // user와의 관계
    // 다수의 post는 하나의 user에 속한다 N:1
    Post.belongsTo(models.User, {
      // foreignkey option : authorId, 별칭(as) : author
      foreignKey: "authorId",
      as: "author",
    });

    // comment와의 관계
    // 하나의 post가 다수의 comment를 가지므로 hasMany
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments",
    });
  };

  return Post;
};
