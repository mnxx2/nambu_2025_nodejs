const express = require("express");
const noteRouter = require("./routes/notes");
const todoRouter = require("./routes/todos");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const models = require("./models");
const path = require("path");
const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const uploadDir = `public/uploads`;
app.use(`/downloads`, express.static(path.join(__dirname, uploadDir)));

// Notes url로 들어오는 주소는 전부 noteRouter 처리
app.use("/notes", noteRouter);
// todos url로 들어오는 주소는 전부 todoRouter 처리
app.use("/todos", todoRouter);
// posts url로 들어오는 주소는 전부 postRouter 처리
app.use("/posts", postRouter);
// users url로 들어오는 주소는 전부 userRouter 처리
app.use("/users", userRouter);
// 비밀번호 암호화 추가 회원가입
app.use("/auth", authRouter);

// 모든 라우터 최하단에 입력 : 라우터는 위에서부터 실행돼서 내려오기 때문
// 404 처리 : 없는 주소를 쳐도 html error 가 아닌 Json 포맷
app.use((req, res) => {
  res.status(404).json({
    status: "Fail",
    message: "요청한 리소스는 찾을 수 없습니다.",
  });
});

// 500 에러 처리
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "ERROR",
    message: `server error : ${err.stack}`,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행중`);

  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("db connection");
    })
    .catch(() => {
      console.log("db error");
      process.exit();
    });
});
