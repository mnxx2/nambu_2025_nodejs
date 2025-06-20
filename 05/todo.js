// 할 일 목록 api
// 필요한 모듈 import
const express = require("express");
const path = require("path");
const moment = require("moment");
const Database = require("better-sqlite3");

// database setting
const db_name = path.join(__dirname, "todo.db");
const db = new Database(db_name);

// Create db table
const create_sql = `
    create table if not exists todos (
        id integer primary key autoincrement,
        task varchar(255),
        description text,
        completed boolean default 0,
        createdAt datetime default current_timestamp,
        priority integer default 1
    )
`;
db.exec(create_sql);

// express setting
const app = express();
const PORT = 3000;
app.use(express.json());

// 문제1 : 할일 쓰기 POST http://localhost:3000/todos
app.post("/todos", (req, res) => {
  const { task, description, priority } = req.body;
  let sql = `
        insert into todos(task, description, priority)
        values(?, ?, ?);
    `;

  const stmt = db.prepare(sql);
  const todo = stmt.run(task, description, priority);
  res.status(201).json({ data: todo });
});

// 문제2 : 할일 목록 조회 GET http://localhost:3000/todos
app.get("/todos", (req, res) => {
  let sql = `
        select id, task, description, completed, createdAt, priority 
        from todos order by priority asc;
    `;

  const stmt = db.prepare(sql);
  const todos = stmt.all();
  res.status(200).json({ data: todos });
});

// 문제3 : 할일 1건 조회 GET http://localhost:3000/todos/1
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        select id, task, description, completed, createdAt, priority 
        from todos where id = ?;
    `;

  const stmt = db.prepare(sql);
  const todo = stmt.get(id);
  res.status(200).json({ data: todo });
});

// 문제4 : 할일 수정 PUT http://localhost:3000/todos/1
app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const { task, description, completed, priority } = req.body;
  let sql = `
        update todos set task = ?, description = ?, completed = ?, priority = ?
        where id = ?;
    `;

  const stmt = db.prepare(sql);
  const updateTodo = stmt.run(task, description, completed, priority, id);
  res.status(200).json({ data: updateTodo });
});

// 문제5 : 할일 삭제 DELETE http://localhost:3000/todos/1
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  let sql = `delete from todos where id = ?;`;

  const stmt = db.prepare(sql);
  stmt.run(id);
  res.status(204).json({ message: "OK" });
});

// server start : npx nodemon todo.js
app.listen(PORT, () => {});
