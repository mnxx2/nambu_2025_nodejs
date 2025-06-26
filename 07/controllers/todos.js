const models = require("../models");

exports.createTodo = async (req, res) => {
  const { task, description } = req.body;
  const todo = await models.Todo.create({
    task: task,
    description: description,
  });

  res.status(201).json({ message: "OK", data: todo });
};

exports.getTodoAll = async (req, res) => {
  // sequelize의 findAll() 사용
  const todos = await models.Todo.findAll();
  res.status(200).json({ message: "OK", data: todos });
};

exports.getTodo = async (req, res) => {
  const id = req.params.id;
  // sequelize의 findByPk() 사용
  const todo = await models.Todo.findByPk(id);

  if (todo) {
    res.status(200).json({ message: "OK", data: todo });
  } else {
    res.status(404).json({ message: "할 일을 찾을 수 없어요." });
  }
};

exports.updateTodo = async (req, res) => {
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
};

exports.deleteTodo = async (req, res) => {
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
};
