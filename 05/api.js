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

// 미들웨어 생성
app.use((req, res, next) => {
  console.log("나의 첫번째 미들웨어");
  next();
});

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
    );

    create table if not exists comments (
      id integer primary key autoincrement,
      content text,
      author text,
      createdAt datetime default current_timestamp,
      postId integer,
      foreign key(postId) references posts(id) on delete cascade
    );
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
  const result = stmt.run(title, content, author); // insert into posts -> 자동증가된 id가 반환 : lastInsertRowid
  const newPost = db
    .prepare(`select * from posts where id = ?`)
    .get(result.lastInsertRowid);
  res.status(201).json({ message: "OK", data: newPost });
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

  // 전체 게시글 수 조회
  const totalCount = db
    .prepare(`select count(*) as count from posts`)
    .get().count;
  const totalPages = Math.ceil(totalCount / limit); // 전체 게시글 20, limit 5일때 20/ 5 = 4

  res.status(200).json({
    data: rows,
    // 페이징 처리를 위한 정보
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount,
      limit: limit,
    },
  });
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

  // 갱신된 포스트 정보 출력
  const updatedPost = db.prepare(`select * from posts where id = ?;`).get(id);
  if (!updatedPost) {
    return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  }

  res.status(200).json({ message: "OK", data: updatedPost });
  // 목록이 출력됨
  // res.redirect("/posts");
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

// comment 테이블 라우팅
// 댓글 추가 : /posts/:id/comments : id는 포스트 아이디,
// 커맨트 테이블은 포스트 테이블 하위이므로 뒤에 입력
// 일관성을 위해 /posts 로 시작
app.post("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const { content, author } = req.body;

  // 정확한 게시글 번호인지 확인
  const post = db.prepare(`select id from posts where id = ?`).get(postId);

  if (!post) {
    return res.status(404).json({ message: "게시글을 찾을 수 없어요." });
  }

  // 게시글 번호가 맞는다면 댓글 추가
  const sql = `insert into comments(postId, author, content) values(?, ?, ?);`;
  const result = db.prepare(sql).run(postId, author, content);

  // 등록된 댓글 확인
  const newComment = db
    .prepare(`select * from comments where id = ?`)
    .get(result.lastInsertRowid);
  res.status(201).json({ message: "OK", data: newComment });
});

// 댓글 가져오기
app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const post = db.prepare(`select id from posts where id = ?`).get(postId);

  if (!post) {
    return res.status(404).json({ message: "게시글을 찾을 수 없어요." });
  }

  const sql = `
    select id, author, content, createdAt 
    from comments where postId = ? order by id desc;
  `;

  // 지정 포스트의 댓글 전부 가져오기 : all() 사용
  const comments = db.prepare(sql).all(postId);
  res.status(200).json({
    data: comments,
    message: "OK",
  });
});

// 댓글 삭제
// 일관성 유지를 위해 postId, commentsId 사용
app.delete("/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  const comment = db
    .prepare(`select id from comments where postId = ? and id = ?`)
    .get(postId, commentId);

  if (!comment) {
    return res.status(404).json({ message: "댓글을 찾을 수 없어요." });
  }

  const sql = `delete from comments where id = ?;`;
  db.prepare(sql).run(commentId);
  res.status(204).end();
});

// 댓글 부분 업데이트(content, author 중 하나만 입력)
app.put("/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  const { author, content } = req.body;

  const comment = db
    .prepare(`select * from comments where postId = ? and id = ?`)
    .get(postId, commentId);

  if (!comment) {
    return res.status(404).json({ message: "댓글을 찾을 수 없어요." });
  }

  // 가져오는 값과 기존의 값을 비교해 있는 값을 사용, 없으면 둘 중 다른 값을 사용
  const newAuthor = author !== undefined ? author : comment.author;
  const newContent = content !== undefined ? content : comment.content;

  db.prepare(`update comments set author = ?, content = ? where id = ?`).run(
    newAuthor,
    newContent,
    commentId
  );

  // 수정한 댓글 가져오기
  const updatedCommnet = db
    .prepare(`select * from comments where id = ?`)
    .get(commentId);

  res.status(200).json({ message: "OK", data: updatedCommnet });
});

// server start
app.listen(PORT, () => {});
