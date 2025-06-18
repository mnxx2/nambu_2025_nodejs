// express 사용 홈페이지 생성
const express = require("express");
const app = express();

// "/", "" -> 같은 의미
// home 페이지
app.get("", (rea, res) => {
  res.send(`
        <html>
            <head>
                <title>첫번째 마이 홈피</title>
            </head>
            <body>
                <h1>첫번째 익스프레스 홈</h1>
                <nav>
                    <a href="/">홈</a>
                    <a href="/about">소개</a>
                    <a href="/contact">연락처</a>
                </nav>
                <p>익스프레스로 만든 간단한 홈피 입니다.</p>
            </body>
        </html>
    `);
});

// /about 페이지
app.get("/about", (req, res) => {
  res.send(`
       <h1>소개 페이지</h1>
       <p>이 웹 홈피는 익스프레스 학습을 위해 만들었어요</p>     
    `);
});

// /contact 페이지
app.get("/contact", (req, res) => {
  res.send(`
       <h1>연락처</h1>
       <p>이메일 : alsdk4931@gmail.com</p>     
    `);
});

// 문제1 : 서버 시작 코드 작성, 포트는 3001
// 서버를 시작하고 http://localhost:3001/ 로 접속
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중`);
});
