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

// 2. 게시판모델 정의
const Post = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "posts",
  }
);

// 3. 답변게시판 모델 정의
const Comment = sequelize.define(
  "Comment",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "comments",
  }
);

// 관계 생성
// 1(User) : N(Post) : 하나의 유저는 여러개의 포스트를 가진다 1:N
User.hasMany(Post, {
  // 여기서는 FK 컬럼명 지정
  foreignKey: "authorId",
});

// N(Post) : 1(User) : 여러개의 포스트는 하나의 유저를 가진다 N:1
Post.belongsTo(User, {
  // 동일한 fk 컬럼명 지정
  foreignKey: "authorId",
});
// post 테이블에 foreign key로 user가 잡힌다

// comments는 user와 post 전부 관계가 있다
// 4. User <-> Comment
User.hasMany(Comment, { foreignKey: "userId" }); // 동일한 컬럼명 지정
Comment.belongsTo(User, { foreignKey: "userId" });

// 5. Comment <-> Post
Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

(async () => {
  await sequelize.sync({ force: true });

  // Post 테이블에는 1명의 유저 ID가 있다
  // 데이터 만들기

  // 1. 사용자 정보
  const user1 = await User.create({
    username: "계란빵",
    email: "egg4u@gmail.com",
    password: "12345678",
    age: 28,
  });

  const user2 = await User.create({
    username: "붕어빵",
    email: "bung2sthebests@gmail.lcom",
    password: "12345678",
    age: 20,
  });

  // 2. 게시글 정보
  const post1 = await Post.create({
    title: "계란빵 마싯어요",
    content: "붕어빵보다 훨씬 마싯음",
    authorId: user1.id,
  });

  const post2 = await Post.create({
    title: "붕어빵이 훨씬 마싯음",
    content: "진짜임 계란빵 믿지마셈 붕어빵이 근본임",
    authorId: user2.id,
  });

  const post3 = await Post.create({
    title: "붕어빵 팔아요",
    content: "두바이붕어빵 팝니다",
    authorId: user2.id,
  });

  // 답변 정보
  const comment1 = await Comment.create({
    content: "저도 계란빵 조아해요",
    userId: user2.id, //fk
    postId: post1.id, //fk
  });

  const comment2 = await Comment.create({
    content: "흠 델리만쥬가 짱인듯",
    userId: user1.id, //fk
    postId: post2.id, //fk
  });

  const comment3 = await Comment.create({
    content: "아저씨 피붕 파세요?",
    userId: user1.id, //fk
    postId: post3.id, //fk
  });

  // post의 모든 게시글과 그에 관련된 user의 정보를 모두 출력
  const posts1 = await Post.findAll({
    include: [
      {
        model: Comment,
        include: [User],
      },
      {
        model: User,
      },
    ],
  });

  console.log(`posts => ${JSON.stringify(posts1)}`);

  // userId가 2인 user의 정보와 관련된 Post를 모두 출력
  const users1 = await User.findByPk(2, {
    include: [
      {
        model: Post,
      },
    ],
  });
  console.log(`users => ${JSON.stringify(users1)}`);
})();
