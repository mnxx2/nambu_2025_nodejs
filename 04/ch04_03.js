// Restful API - express 사용
const express = require("express");
const { error } = require("winston");
const app = express();
const PORT = 3000;

// 샘플 데이터
const books = [
  { id: 1, title: "Node.js 교과서", author: "이지훈" },
  { id: 2, title: "한눈에 보는 Node.js", author: "이지훈" },
  { id: 3, title: "Node.js 디자인 패턴", author: "이지훈" },
];

// 미들웨어 : 응답과 요청시에 json 처리 담당
app.use(express.json());

// 라우팅 설정
// 전체 책 목록
app.get("/books", (req, res) => {
  res.json(books);
});

// 책 한권
// /books/ 뒤의 :id는 계속 변하는 값
app.get("/books/:id", (req, res) => {
  const id = req.params.id; // 문자열
  // req.params.id가 문자열이기 때문에 parseInt()로 형변환
  // 타입과 값이 동일해야하기 때문
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return res.status(404).json({ message: "책을 찾을 수 없어요" });
  }

  // 자동으로 status가 200 : 정상
  res.json(book);
});

// 책 추가
app.post("/books", (req, res) => {
  const { title, author } = req.body; // 요청 본문에서 title, author 추출
  const book = {
    id: books.length + 1,
    title,
    author,
  };

  books.push(book); // push 배열에 book 객체 추가
  res.status(201).json(book);
});

// 데이터 수정
app.put("/books/:id", (req, res) => {
  const id = req.params.id;
  const { title, author } = req.body;

  // 어떤 데이터를 수정할지 찾기
  const book = books.find((book) => book.id === parseInt(id));

  if (!book) {
    return res.status(404).json({ error: "책을 찾을 수 없어요" });
  }

  book.title = title;
  book.author = author;
  res.json(book);
});

// 데이터 삭제
app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  // 배열을 사용하기 때문에 어떤 데이터를 사용할건지 인덱스 지정
  const index = books.findIndex((book) => (book.id = parseInt(id)));

  if (index === -1) {
    return res.status(404).json({ error: "책을 찾을 수 없어요" });
  }

  // 배열이기 때문에 삭제하려면 splice() 함수 사용
  books.splice(index, 1);
  // 204 : No Content : 요청은 성공했지만 보낼 컨텐츠는 없다
  res.status(204).send();
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행중`);
});
