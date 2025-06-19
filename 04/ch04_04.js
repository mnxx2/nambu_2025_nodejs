// RESTful API - express 사용 : 메모 목록/수정/추가/삭제/검색 만들기
const express = require("express");
const moment = require("moment");
const app = express();
const PORT = 3000;

// 메모 데이터
// createAt : moment().format("YYYY-MM-DD");
const memos = [
  {
    id: 1,
    title: "샘플 메모1",
    content: "오늘 점심은 머먹지 너무 더운데",
    createAt: "2025-06-19",
  },
  {
    id: 2,
    title: "샘플 메모2",
    content: "내일부터는 장마 시작, 주말마다 비가 오네",
    createAt: "2025-06-19",
  },
];

// 미들웨어 : 요청 본문에 json 포맷 인식 및 처리
app.use(express.json());

// 1. 메모 목록 반환
app.get("/memos", (req, res) => {
  res.send(memos);
});

// 2. 메모 1개 반환 (id사용)
app.get("/memos/:id", (req, res) => {
  const id = req.params.id;
  const memo = memos.find((m) => m.id === parseInt(id));

  if (!memo) {
    return res.status(404).json({ error: "메모가 없습니다" });
  }

  res.json(memo);
});

// 3. 메모 쓰기
app.post("/memos", (req, res) => {
  const { title, content } = req.body;
  const memo = {
    id: memos.length + 1,
    title,
    content,
    createAt: moment().format("YYYY-MM-DD"),
  };

  memos.push(memo);
  res.status(201).json(memo);
});

// 4. 메모 수정
app.put("/memos/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  const memo = memos.find((memo) => memo.id === parseInt(id));

  if (!memo) {
    return res.status(404).json({ error: "메모가 없습니다" });
  }

  memo.title = title;
  memo.content = content;
  memo.createAt = moment().format("YYYY-MM-DD");
  res.status(200).json(memo);
});

// 5. 메모 삭제
app.delete("/memos/:id", (req, res) => {
  const id = req.params.id;
  const index = memos.findIndex((memo) => memo.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "메모가 없습니다" });
  }

  memos.splice(index, 1);
  res.status(204).send();
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행중`);
});
