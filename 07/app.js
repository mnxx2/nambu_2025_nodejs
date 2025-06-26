const express = require("express");
const noteRouter = require("./routes/notes");
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
