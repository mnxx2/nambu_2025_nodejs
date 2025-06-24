// 필요한 모듈 Import
const { Sequelize, Model, DataTypes, Op } = require("sequelize");

// ORM을 만들 수 있는 시퀄라이즈 객체 생성
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

// 회원 모델 정의
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "users",
  }
);

(async () => {
  // 문제1 : 모델로 테이블을 생성하는 코드 작성
  await sequelize.sync({ force: false });

  // 문제2 : 사용자 2명 생성
  const user1 = await User.create({
    username: "계란빵",
    password: "egg44",
    email: "eggfit@gmail.com",
    birthDate: "1998-09-25",
  });
  console.log(`user1 => ${JSON.stringify(user1)}`);

  const user2 = await User.create({
    username: "붕어빵",
    password: "fishis9d!",
    email: "bung-bun@gmail.com",
    birthDate: "1998-03-19",
  });
  console.log(`user2 => ${JSON.stringify(user2)}`);

  // 문제3 : 사용자 전체 검색
  const userAll = await User.findAll();
  console.log(`userAll => ${JSON.stringify(userAll)}`);

  // 문제4 : 사용자 아이디가 2번인 사람만 출력
  const userByPk = await User.findByPk(2);
  console.log(`userByPk => ${JSON.stringify(userByPk)}`);

  // 문제5 : 사용자 아이디가 2번인 사람의 email을 jihooni@kakao.com으로 변경 후 출력
  await User.update(
    {
      email: "jihooni@kakao.com",
    },
    {
      where: {
        id: 2,
      },
    }
  );
  const userUpdate = await User.findByPk(2);
  console.log(`userUpdate => ${JSON.stringify(userUpdate)}`);

  // 문제6 : 사용자 아이디가 2번인 사람을 삭제하고, 2번인 사람 출력(null)
  await User.destroy({
    where: {
      id: 2,
    },
  });
  const userDelete = await User.findByPk(2);
  console.log(`userDelete => ${JSON.stringify(userDelete)}`);
})();
