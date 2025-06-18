// express 모듈 사용 - 웹 서버 관련
// 1. express 모듈 가져오기
const express = require("express");

// 2. express application 설정
const app = express();

// 3. 포트 설정
// express 는 기본적으로 3000 포트 사용
const PORT = 3000;

// 4. 라우팅 설정
// 첫번째 슬래쉬 : uri
// 콜백 함수 : 서버 실행 시 호출되는 요소
// app.get() : get 요청을 처리하는데 http://localhost:3000/ 뒤에 아무것도 없는 주소
app.get("/", (req, res) => {
  // req : HTTP 요청, res : HTTP 응답
  res.send("Hello World1");
});

// http://localhost:3000/hello 주소가 get 요청으로 들어왔을 때 처리
// 소스를 바꾸면 서버 다시 실행
app.get("/hello", (req, res) => {
  res.send("안녕 /hello 주소에 접근하셨습니다.");
});

// 5. 서버 시작
// 서버가 3000번 포트로 요청을 기다림
app.listen(PORT, () => {
  // 서버가 실행되면 콘솔에 출력됨
  console.log(`서버가 http://localhost:${PORT}에서 실행중 입니다.`);
});

// 문제1 : http://localhost:3000/world GET 요청할 경우
// 응답을 '안녕 /world 주소에 접근하였습니다.' 라우터 생성
app.get("/world", (req, res) => {
  res.send("안녕 /world 주소에 접근하였습니다.");
});
