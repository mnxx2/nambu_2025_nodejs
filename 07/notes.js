// Note App
// 필요한 모듈 import
const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;

// 미들웨어 생성
app.use(express.json());

// 노트 입력
app.post("/notes", async (req, res) => {
  const { title, content, tag } = req.body;

  const note = await models.Note.create({
    title: title,
    content: content,
    tag: tag,
  });

  res.status(201).json({ message: "OK", data: note });
});

// 노트 목록 조회
app.get("/notes", async (req, res) => {
  const notes = await models.Note.findAll();
  res.status(200).json({ message: "OK", data: notes });
});

// 태그로 노트 목록 조회
app.get("/notes/:tag", async (req, res) => {
  const tag = req.params.tag;
  const notes = await models.Note.findAll({
    where: { tag: tag },
  });
  res.status(200).json({ message: "OK", data: notes });
});

// id로 노트 수정
app.put("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content, tag } = req.body;
  const note = await models.Note.findByPk(id);

  if (note) {
    if (title) note.title = title;
    if (content) note.content = content;
    if (tag) note.tag = tag;

    await note.save();
    res.status(200).json({ message: "OK", data: note });
  } else {
    res.status(404).json({ message: "노트를 찾을 수 없습니다." });
  }
});

// id로 노트 삭제
app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note = await models.Note.destroy({
    where: { id: id },
  });

  if (note > 0) {
    res.status(200).json({ message: "노트를 삭제했습니다." });
  } else {
    res.status(404).json({ message: "노트를 찾을 수 없습니다." });
  }
});

// server start
app.listen(PORT, () => {
  console.log(`Note 서버가 http://localhost:${PORT} 에서 실행중`);

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
