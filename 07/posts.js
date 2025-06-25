// POST/COMMENT 전용 REST ENDPOINT
const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;

app.use(express.json());

// 게시글 입력
app.post("/posts", async (req, res) => {
  const { title, content } = req.body;

  // 원래는 jwt 토큰에서 사용자 id를 받아와서 넣어줘야 하지만 아직 안배워서
  // 사용자를 생성하고난 뒤 게시글 입력

  // user 정보가 있는지 확인 후 없으면 user 생성
  let user = await models.User.findOne({
    where: { email: "saltbready@example.com" },
  });

  if (!user) {
    user = await models.User.create({
      name: "소금빵",
      email: "saltbready@example.com",
      password: "12345678",
    });
  }

  const post = await models.Post.create({
    title: title,
    content: content,
    authorId: user.id,
  });

  res.status(201).json({ message: "OK", data: post });
});

// 게시글 목록 조회
app.get("/posts", async (req, res) => {
  const posts = await models.Post.findAll();
  res.status(200).json({ message: "OK", data: posts });
});

// id로 게시글 목록 조회
app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const post = await models.Post.findByPk(id);

  res.status(200).json({ message: "OK", data: post });
});

// id로 게시글 수정
app.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  const post = await models.Post.findByPk(id);

  if (post) {
    if (title) post.title = title;
    if (content) post.content = content;

    await post.save();
    res.status(200).json({ message: "OK", data: post });
  } else {
    res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  }
});

// id로 게시글 삭제
app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const result = await models.Post.destroy({
    where: { id: id },
  });

  if (result > 0) {
    res.status(200).json({ message: "게시글을 삭제했습니다." });
    // res.status(204).send()
  } else {
    res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  }
});

// comment code
// 댓글 추가
app.post("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;

  // 1. 게시글 존재 여부 확인
  const post = await models.Post.findByPk(postId);

  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  // 1.5 사용자 추가
  let user = await models.User.findOne({
    where: { email: "b@example.com" },
  });

  if (!user) {
    user = await models.User.create({
      name: "뉴진스",
      email: "new@example.com",
      password: "12345678",
    });
  }

  // 2. comment 추가
  const comment = await models.Comment.create({
    content: content,
    postId: postId,
    userId: user.id,
  });

  res.status(201).json({ message: "OK", data: comment });
});

// 댓글 목록 조회
app.get("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;

  const comments = await models.Comment.findAll({
    where: { postId: postId },
    include: [
      // user의 정보도 같이 가져오는 author라는 별칭으로 가져오고 비밀번호를 제외한 정보 조회
      // attributes를 주는 이유는 비밀번호를 조회 못하도록 하기 위해
      { model: models.User, as: "author", attributes: ["id", "name", "email"] },
    ],
    // createdAt 속성의 역순을 기준으로 조회
    order: [["createdAt", "DESC"]],
  });

  res.status(200).json({ message: "OK", data: comments });
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);

  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("DB connection");
    })
    .catch(() => {
      console.log("DB error");
      process.exit();
    });
});
