// 가계부
// 필요한 라이브러리 import
const express = require("express");
const moment = require("moment");
const Database = require("better-sqlite3");
const path = require("path");

// db setting
const db_name = path.join(__dirname, "expense.db");
const db = new Database(db_name);

// express setting
const app = express();
const PORT = 3000;
app.use(express.json()); // middleware -> 전체 엔드포인트에 특정 기능을 일괄 적용

// create table
// title -> 구매 품목, amout -> 구매 수량
// date : YYYY-MM-DD
const create_sql = `
    create table if not exists expenses (
        id integer primary key autoincrement,
        title text not null,
        amount integer not null,
        date text not null,
        memo text
    )
`;

db.exec(create_sql);

// 문제1 : 가계부 입력 POST /expenses
app.post("/expenses", (req, res) => {
  const { title, amount, date, memo } = req.body;
  let sql = `insert into expenses(title, amount, date, memo) values(?, ?, ?, ?);`;

  const stmt = db.prepare(sql);
  const exp = stmt.run(title, amount, date, memo);
  res.status(201).json({ message: "OK", data: exp });
});

// 문제2 : 가계부 전체 목록 조회 GET /expenses
app.get("/expenses", (req, res) => {
  let sql = `select * from expenses order by id;`;

  const stmt = db.prepare(sql);
  const rows = stmt.all();
  res.status(200).json({ message: "OK", data: rows });
});

// 문제3 : 가계부 목록 조회 (날짜) GET /expenses/2025-06-23 -> 해당되늰 날짜의 내역만
app.get("/expenses/:date", (req, res) => {
  const date = req.params.date;
  let sql = `select * from expenses where date = ?;`;

  const stmt = db.prepare(sql);
  const dateExp = stmt.all(date);
  res.status(200).json({ message: "OK", data: dateExp });
});

// 문제4 : 가계부 수정 PUT /expenses/12 -> 금액, 항목 등 수정
app.put("/expenses/:id", (req, res) => {
  const id = req.params.id;
  const { title, amount, memo } = req.body;
  let sql = `
    update expenses set title = ?, amount = ?, memo = ? where id = ?;
  `;

  const stmt = db.prepare(sql);
  const updateExp = stmt.run(title, amount, memo, id);
  res.status(200).json({ message: "OK", data: updateExp });
});

// 문제5 : 가계부 삭제 DELETE /expenses/12 -> 해당 항목 삭제
app.delete("/expenses/:id", (req, res) => {
  const id = req.params.id;
  let sql = `delete from expenses where id = ?`;

  const stmt = db.prepare(sql);
  stmt.run(id);
  res.status(200).json({ message: "OK" });
});

app.listen(PORT, () => {});
