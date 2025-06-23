// 체크리스트 시스템 백엔드 만들기

// 첫번째 요구사항
// 2025년 여름 휴가 준비물 : 여권, 충전기, 세면도구, … 의류, 점퍼, 코트, 반팔티 등
// 캠핑 준비물 : 텐트, 의자, 렌턴, 침낭 … , 등

// 백엔드 생성

// 테이블 설계도

// - 아이디 pk → id integer
// - 캠핑 준비물, 여름 휴가 준비물 담을 수 있는 그룹핑 항목 → category text
// - 실제 준비해야할 물건 → item text
// - 수량 → amount integer
// - 체크 여부 → checkyn boolean

// 1. REST API
//     1. POST /checklist → 체크리스트 입력
//     2. GET /checklist?category=여름휴가준비물
//     3. PUT /checklist/:id → 체크 여부를 toggle 0→1 1→0
//     4. DELETE /checklist/:id

// 필요한 라이브러리 import
const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

// db setting
const db_name = path.join(__dirname, "checklist.db");
const db = new Database(db_name);

// express setting
const app = express();
const PORT = 3000;
app.use(express.json());

const create_sql = `
    create table if not exists checklists (
        id integer primary key autoincrement,
        category text not null,
        item text not null,
        amount integer not null,
        checkyn boolean not null default 0
    );
`;

db.exec(create_sql);

// 체크리스트 추가
app.post("/checklist", (req, res) => {
  const { category, item, amount } = req.body;

  let sql = `
        insert into checklists(category, item, amount)
        values(?, ?, ?);
    `;

  const stmt = db.prepare(sql);
  const chk = stmt.run(category, item, amount);
  const newChk = db
    .prepare(`select * from checklists where id = ?`)
    .get(chk.lastInsertRowid);

  res.status(201).json({ message: "OK", data: newChk });
});

// 카테고리별 항목 조회
app.get("/checklist", (req, res) => {
  const category = req.query.category;
  let sql = `select * from checklists where category = ?`;

  const stmt = db.prepare(sql);
  const rows = stmt.all(category);

  res.status(200).json({ message: "OK", data: rows });
});

// 체크리스트 조회
app.get("/checklist", (req, res) => {
  let sql = `select * from checklists;`;

  const stmt = db.prepare(sql);
  const rows = stmt.all();

  res.status(200).json({ message: "OK", data: rows });
});

// 체크리스트 항목 수정
// app.put("/checklist/:id", (req, res) => {
//   const id = req.params.id;
//   const { category, item, amount, checkyn } = req.body;

//   const check = db.prepare(`select * from checklists where id = ?`).get(id);

//   if (!check) {
//     return res.status(404).json({ message: "체크리스트 항목이 없습니다." });
//   }

//   const newCategory = category !== undefined ? category : check.category;
//   const newItem = item !== undefined ? item : check.item;
//   const newAmount = amount !== undefined ? amount : check.amount;
//   const newCheckyn = checkyn !== undefined ? checkyn : check.checkyn;

//   db.prepare(
//     `update checklists set category = ?, item = ?, amount = ?, checkyn = ? where id = ?`
//   ).run(newCategory, newItem, newAmount, newCheckyn, id);

//   const updatedCheck = db
//     .prepare(`select * from checklists where id = ?`)
//     .get(id);

//   res.status(200).json({ message: "OK", data: updatedCheck });
// });

// 체크리스트 삭제
app.delete("/checklist/:id", (req, res) => {
  const id = req.params.id;
  let sql = `delete from checklists where id = ?`;

  const check = db.prepare(`select * from checklists where id = ?`).get(id);

  if (!check) {
    return res.status(404).json({ message: "체크리스트 항목이 없습니다." });
  }

  db.prepare(sql).run(id);
  res.status(204).end();
});

// 강사님 Put - 체크 여부 toggle
app.put("/checklist/:id", (req, res) => {
  const id = req.params.id;
  db.prepare(
    `update checklists set checkyn = case checkyn when 1 then 0 else 1 end where id = ?`
  ).run(id);

  const item = db.prepare(`select * from checklists where id = ?`).get(id);
  res.status(200).json({ message: "OK", data: item });
});

// server start
app.listen(PORT, () => {});
