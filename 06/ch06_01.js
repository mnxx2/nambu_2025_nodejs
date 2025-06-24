// 필요한 모듈 Import
const { Sequelize, Model, DataTypes, Op } = require("sequelize");

// ORM을 만들 수 있는 시퀄라이즈 객체 생성
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

// 모델 생성 : create table문이 실행됨
const Post = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    // 하나만 있을 경우 괄호 생략 가능
    author: DataTypes.STRING,
  },
  { tableName: "posts" }
);

// 레코드 생성
// 시퀄라이즈는 작업이 느리기 때문에 모델 생성은 async로 감싸야한다
// 함수는 즉시 실행하는 함수인데 이렇게 하는 이유는 sequelize는 promise를 이용해서 작업하는데
// async/await를 이용해서 promise 작업을 하기 위해서 즉시실행함수 안에서 코딩
(async () => {
  // force는 강제로 생성하라는 뜻, 테이블이 계속 생성됨
  // false 로 설정하면 한번만 생성하고 생성하지 않음
  await sequelize.sync({ force: false });

  // 실제 레코드
  const post1 = await Post.create({
    title: "오늘은 비가 온대요",
    content: "퇴근 시간부터 온대요. 저녁에 오길",
    author: "정민아",
  });
  console.log(`post1 created => ${JSON.stringify(post1)}`);

  const post2 = await Post.create({
    title: "오늘 저녁은 뭐먹지",
    content: "떡볶이와 순대 오뎅이 어떨까요?",
    author: "정민아",
  });
  console.log(`post2 created => ${JSON.stringify(post2)}`);

  // findAll() - select * from posts
  const posts = await Post.findAll();
  console.log(`post findAll => ${JSON.stringify(posts)}`);

  // findByPk() - pk값을 사용해 데이터 조회
  // select * from posts where id = ?
  const post11 = await Post.findByPk(1);
  console.log(`post11 => ${JSON.stringify(post11)}`);

  // findOne() - select * from posts where id = ? limit 1
  const post12 = await Post.findOne({
    where: {
      author: "정민아",
    },
  });
  console.log(`post12 => ${JSON.stringify(post12)}`);

  // update
  await Post.update(
    {
      title: "이번주는 ORM을 공부하는 주입니다.",
      content: "이번주는 ORM을 지겹게 공부하는 주입니다.",
    },
    {
      where: {
        id: 1,
      },
    }
  );
  const post13 = await Post.findByPk(1);
  console.log(`post13 => ${JSON.stringify(post13)}`);

  // delete
  await Post.destroy({
    where: {
      id: 1,
    },
  });
  const post14 = await Post.findByPk(1);
  console.log(`post14 => ${JSON.stringify(post14)}`);
})();
