// POST/COMMENT 전용 REST ENDPOINT
const express = require("express");
const models = require("./models");

// multer import
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

// formdata, multi port forma 데이터를 받기 위한 미들웨어 설정
// extended : true : 복잡한 객체 처리 가능
app.use(express.urlencoded({ extended: true }));

// 첨부파일 처리를 위한 디렉토리 설정
const uploadDir = `public/uploads`;
app.use(`/downloads`, express.static(path.join(__dirname, uploadDir)));

// 멀터 저장소 설정
const storage = multer.diskStorage({
  // 도착지정보
  destination: `./${uploadDir}`, // 해당 파일이 있는 디렉토리 하위로 uploadDir 생성 요청

  // 파일명을 유니크하게 저장(파일명에 중복이 없도록 만들어준다)
  filename: function (req, file, cb) {
    // file.originalname.name : aa
    // -
    // 1781029281
    // .png
    // fname = aa-1781029281.png
    const fname =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    cb(
      null, // error가 있을 때 여기에 넣는다
      fname
    );
  },
});

// 파일저장을 위한 미들웨어 생성
const upload = multer({ storage: storage });

// 파일 첨부를 추가한 게시글 입력
// 1. POST /posts 요청이 들어오면 먼저 upload.single("file") 미들웨어를 탄다
// upload 미들웨어의 역할은 첨부파일을 uploadDir 폴더에 저장하는데 이름은 aa-1122344.png 로 설정한다
// req 객체에 첨부파일 정보를 실어준다

// 2. 생성한 핸들러 함수에서 req.file 객체에서 파일 정보 사용 가능
app.post("/posts", upload.single("file"), async (req, res) => {
  const { title, content } = req.body;

  // 첨부파일 가져오기
  // 파일이 있으면 파일이름에 넣고 없으면 null
  let filename = req.file ? req.file.filename : null;
  filename = `/downloads/${filename}`; // http://localhost:3000/ + filename -> http:/localhost:3000/downloads/aa-123344.png

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
    fileName: filename,
  });

  res.status(201).json({ message: "OK", data: post });
});

// 게시글 입력
// app.post("/posts", async (req, res) => {
//   const { title, content } = req.body;

//   // 원래는 jwt 토큰에서 사용자 id를 받아와서 넣어줘야 하지만 아직 안배워서
//   // 사용자를 생성하고난 뒤 게시글 입력

//   // user 정보가 있는지 확인 후 없으면 user 생성
//   let user = await models.User.findOne({
//     where: { email: "saltbready@example.com" },
//   });

//   if (!user) {
//     user = await models.User.create({
//       name: "소금빵",
//       email: "saltbready@example.com",
//       password: "12345678",
//     });
//   }

//   const post = await models.Post.create({
//     title: title,
//     content: content,
//     authorId: user.id,
//   });

//   res.status(201).json({ message: "OK", data: post });
// });

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

// 댓글 수정
app.put("/posts/:postId/comments/:id", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  const { content } = req.body;

  // 1. 게시물이 있는지 확인
  const post = await models.Post.findByPk(postId);

  // 없다면 404 반환
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  // 2. 댓글 가지고 오기
  const comment = await models.Comment.findOne({
    where: {
      id: commentId,
      postId: postId,
    },
  });

  if (!comment) {
    return res.status(404).json({ message: "post not found" });
  }

  // 3. 댓글 수정 및 저장
  if (content) comment.content = content;
  await comment.save();
  res.status(200).json({ message: "OK", data: comment });
});

// 댓글 삭제
app.delete("/posts/:postId/comments/:id", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;

  // 1. 게시물 존재 여부 확인
  const post = await models.Post.findByPk(postId);
  console.log(post);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  // 2. 댓글 삭제
  const result = await models.Comment.destroy({
    where: { id: commentId, postId: postId },
  });

  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "comment not found" });
  }
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
