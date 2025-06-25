module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
      },
    },
    {
      tableName: "users",
    }
  );

  // 관계 생성
  User.associate = function (models) {
    // Post와의 관계
    // 하나의 user는 다수의 post를 가진다 1:N
    User.hasMany(models.Post, {
      foreignKey: "authorId",
      as: "posts",
    });

    // comment와의 관계
    // 하나의 user는 다수의 comment를 가질 수 있으므로 hasMany
    User.hasMany(models.Comment, {
      foreignKey: "userId",
      as: "comments",
    });
  };

  return User;
};
