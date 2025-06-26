const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todos");

// http://localhost:3000/todos 로 오는 요청들 전부 처리
router.post("/", todoController.createTodo);
router.get("/", todoController.getTodoAll);
router.get("/:id", todoController.getTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
