// express + sequelize crud를 제공하는 서버
// todos restful api 서버

// 관련된 모듈 import
const express = require("express");
// require('./models/index.js') 형태와 같다
// models 에는 index.js 맨 하단에 있는 db 변수가 할당된다
// Models.Todo models.Post 형태로 사용
const models = require("./models"); // models 폴더 자체를 import
const app = express();
const PORT = 3000;

app.use(express.json());

// 할일추가
app.post("/todos", async (req, res) => {
  const { task, description } = req.body;
  const todo = await models.Todo.create({
    task: task,
    description: description,
  });

  res.status(201).json({ message: "OK", data: todo });
});

// 할일목록조회
app.get("/todos", async (req, res) => {
  // sequelize의 findAll() 사용
  const todos = await models.Todo.findAll();
  res.status(200).json({ message: "OK", data: todos });
});

// 할일상세조회
app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  // sequelize의 findByPk() 사용
  const todo = await models.Todo.findByPk(id);

  if (todo) {
    res.status(200).json({ message: "OK", data: todo });
  } else {
    res.status(404).json({ message: "할 일을 찾을 수 없어요." });
  }
});

// 할일수정
app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const { task, description, completed, priority } = req.body;
  const todo = await models.Todo.findByPk(id);

  // 데이터 하나만 입력해도 반영될 수 있도록 이전의 데이터와 비교 후 값 사용
  if (todo) {
    if (task) todo.task = task;
    if (description) todo.description = description;
    if (completed) todo.completed = completed;
    if (priority) todo.priority = priority;

    await todo.save();
    res.status(200).json({ message: "OK", data: todo });
  } else {
    res.status(404).json({ message: "할 일을 찾을 수 없어요." });
  }
});

// 할일삭제
app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const result = await models.Todo.destroy({
    where: { id: id },
  });
  console.log(result); // Result는 숫자 -> 지운 행의 갯수

  if (result > 0) {
    res.status(200).json({ message: "삭제가 성공했어요." });
  } else {
    res.status(404).json({ message: "할 일을 찾을 수 없어요." });
  }
});

app.listen(PORT, () => {
  console.log(`Todo 서버가 http://localhost:${PORT} 에서 실행중`);

  // promise
  // sync로 db 생성
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("db connected");
    })
    .catch(() => {
      console.log("db error");
      process.exit();
    });
});
