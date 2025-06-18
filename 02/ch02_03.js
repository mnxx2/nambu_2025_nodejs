// 웹서버 만들기
const http = require("http");

// 웹 서버를 만들 수 있는 함수
// createServer()의 매개변수로는 콜백함수가 하나 들어간다
// 콜백함수의 매개변수로는 req : http 요청, res : http 응답 이 들어간다
const server = http.createServer((req, res) => {
  // 요청이 올때마다 실행되는 콜백 함수
  // writehead() : 요청의 헤드 작성하는 함수
  // 요청을 한 브라우저에게 응답은 200 성공이고, 컨텐트 타입은 그냥 텍스트고, 캐릭터셋(인코딩)은 utf-8
  // 이라고 헤더 정보를 알려주는 것
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

  // 본문에 문자열 내용을 띄운다 -> 클라이언트에게 보내준다
  res.end("안녕하세요~ 정민아의 첫 번째 웹서버에 오셨어요");
});

// 포트 번호 설정 -> 서버를 띄우기 위해 필요함
const PORT = 3000;
// 서버가 3000번 포트로 설정되어 요청을 기다린다
server.listen(PORT, () => {
  console.log(`나만의 웹서버가 http://localhost:${PORT} 에서 실행 중 입니다.`);
});
