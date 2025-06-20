// 필요한 라이브러리 모듈 import
const express = require("express"); // 웹서버
const moment = require("moment"); // 날짜
const Database = require("better-sqlite3"); // sqlite 접속
const path = require("path"); // 경로 설정

// DB setting
// sqlite : 디바이스나 간단한 Sql문 사용, 설치할 필요 없이 파일만 생성
const db_name = path.join(__dirname, "post.db"); // db 파일 생성
const db = new Database(db_name); // database 생성 - db_name으로

// express setting
const app = express();
const PORT = 3000;
app.use(express.json()); // 요청 응답/처리 자동

// 1. post.db 게시판 전용 테이블 생성
// if not exists : 테이블이 있으면 만들지 않고, 없으면 아래와 같이 테이블 생성
// autoincrement : 값을 넣지 않으면 자동 증가
// 테이블명은 posts
// createAt -> createdAt
const create_sql = `
    create table if not exists posts (
        id integer primary key autoincrement,
        title varchar(255),
        content text,
        author varchar(100),
        createAt datetime default current_timestamp,
        count integer default 0
    )
`;
db.exec(create_sql);

// 게시글 추가
// 물음표에 차례대로 title, content, author 넣음
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  let sql = `
        insert into posts(title, content, author) values (?, ?, ?);
    `;
  // prepare() : sql문을 파싱
  // run() : 내부적으로 sql문에 변수의 값이 넣어지고 db에 데이터가 추가된다
  const stmt = db.prepare(sql);
  stmt.run(title, content, author);
  res.status(201).json({ message: "OK" });
});

// 게시글 목록 가져오기 - 목록 조회
app.get("/posts", (req, res) => {
  // limit : 한 페이지에 몇 개의 게시글을 가져올건지
  // offset : 몇 번째부터 게시글을 가져올건지 시작 위치
  let sql = `
        select id, title, content, author, createAt
        from posts order by createAt desc limit ? offset ?
    `;

  // pagination
  // 페이지 번호를 쿼리에서 가져옴. 기본값은 1
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5;
  // 인덱스 0부터 시작해서 -1
  // 페이지가 1이면 0 ~ 4번째까지 가져오고 2면 5 ~ 9번째까지 3이면 10 ~ 14까지 가져온다
  const offset = (page - 1) * limit; // 1~5 6~10 11~15 번째 글 보여주기

  const stmt = db.prepare(sql); // 쿼리 준비
  const rows = stmt.all(limit, offset); // 쿼리 날리기, limit과 offset 전달해서 실행
  console.log(rows);

  res.status(200).json({ data: rows });
});

// 게시글 1개 가져오기 - 상세 정보 조회
// 조회수 업데이트
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        select id, title, content, author, createAt, count
        from posts where id = ?
    `;

  // 한번 실행하면 실행할 때마다 조회수 업데이트
  let ac_sql = `update posts set count = count + 1 where id = ?`;
  // 출력물을 받을 필요가 없으니 json() 불필요
  db.prepare(ac_sql).run(id);

  const stmt = db.prepare(sql);
  const post = stmt.get(id); // 실제로 쿼리문 실행, 하나를 가져올 때는 get(), 인자는 id(?자리에 들어갈 요소)

  res.status(200).json({ data: post });
});

// 게시글 수정
app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  let sql = `
        update posts set title = ?, content = ?
        where id = ?
    `;

  const stmt = db.prepare(sql);
  stmt.run(title, content, id); // 실제 쿼리문이 db에서 실행, 순서는 ? 순서를 기준으로

  // 목록이 출력됨
  res.redirect("/posts");
});

// 게시글 삭제
app.delete("/posts/:id", (req, res) => {
  // 삭제할 게시글 id 가져오기
  const id = req.params.id;
  // 쿼리문 만들기
  let sql = `delete from posts where id = ?`;

  // 쿼리문 준비
  const stmt = db.prepare(sql);
  // 쿼리문 실행
  stmt.run(id);
  // 응답 보내기
  res.json({ message: "OK" });
});

// server start
app.listen(PORT, () => {});
