// foreign key 사용
const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "posts.db",
});

// 1. 회원모델 정의
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      // ORM은 유효성 검사를 할 수 있다
      validate: {
        len: [2, 5], // 사용자 이름은 2자리부터 5자리까지만 허용
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // 이메일은 항상 유니크한 값이 오게 된다
      validate: {
        isEmail: true, // 이메일 형식이어야만 들어올 수 있도록 유효성 검사
      },
    },
    password: {
      // 암호화한 것을 역순으로 풀지 못하게 단방향 암호화 : bcrypt
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 20],
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 150,
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    tableName: "users",
  }
);

(async () => {
  await sequelize.sync({ force: true });

  const user1 = await User.create({
    username: "국화빵",
    email: "flower5sun@gmail.com",
    password: "12345678",
    age: 50,
  });

  const user2 = await User.create({
    username: "소금빵",
    email: "saltnbutterS2@gmail.com",
    password: "12345678",
    age: 40,
  });

  const user3 = await User.create({
    username: "붕어빵",
    email: "h5lyfishbread@gmail.com",
    password: "12345678",
    age: 30,
  });

  const user4 = await User.create({
    username: "계란빵",
    email: "eggslife@gmail.com",
    password: "12345678",
    age: 20,
  });

  const user5 = await User.create({
    username: "문어빵",
    email: "5cto_mine@gmail.com",
    password: "12345678",
    age: 10,
  });

  const users1 = await User.findAll({
    where: {
      email: {
        // like %검색%
        [Op.like]: "%gmail%",
      },
    },
  });
  console.log(
    users1.map((u) => {
      return {
        email: u.email,
        name: u.username,
      };
    })
  );

  const users2 = await User.findAll({
    where: {
      username: {
        [Op.in]: ["계란빵", "붕어빵"],
      },
    },
  });
  console.log(users2.map((u) => u.username));

  const users3 = await User.findAll({
    where: {
      age: {
        [Op.lt]: 20,
        // lt : less than == '<', gt : greater than '>'
        // lte == '<=' , gte == '>='
      },
    },
  });
  console.log(users3);
})();
