// 파일 다루기 fs 모듈 이용
// require : 모듈을 가져오라는 뜻으로 commonjs 방식 -> import 와 같다
// fs 모듈 (파일 다루기 모듈) 임포트
const fs = require("fs");

fs.writeFileSync("test.txt", "hello world!");
console.log("파일 쓰기 완료");

// 문제1 : hello.txt 만들고, 내용에는 안녕하세요 반갑습니다. 제 이름은 000입니다.
fs.writeFileSync("hello.txt", "안녕하세요 반갑습니다. 정민아입니다.");
console.log("파일 쓰기 완료");

// 파일 읽기
// readFileSync('대상파일', '인코딩');
// 윈도우는 euc-kr을 기본으로 사용하기 때문에 한글이 깨질 수 있음
const data = fs.readFileSync("test.txt", "utf-8");
console.log(data);

// 문제2 : hello.txt 읽어서 콘솔로 출력
const data2 = fs.readFileSync("hello.txt", "utf-8");
console.log(data2);

// 파일 상태 확인
const stats1 = fs.statSync("test.txt");
console.log(stats1);

// 비동기식 파일 관리
// 만약 여러개의 파일을 읽어오는데 첫번째 파일의 크기가 크다면 나머지 파일은 실행되지 않음
// 이를 방지하기 위해 비동기식 처리 -> Libuv api
// 세번째 인자의 콜백함수는 실제 느린 작업을 모두 처리하고 콘솔 출력 처리
fs.writeFile("async-test.txt", "Async Hello World!", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("비동기 파일 쓰기 완료");
});

// 문제3 : async-hello.txt 파일을 만들고, 안녕하세요 비동기 파일 쓰기 테스트 작업입니다. 기입
fs.writeFile(
  "async-hello.txt",
  "안녕하세요. 비동기 파일 쓰기 테스트 작업입니다.",
  (err) => {
    if (err) {
      console.log(err);
    }

    console.log("비동기 파일 쓰기 완료!");
  }
);

// 비동기식 파일 읽기
// data에는 파일의 내용이 들어온다
fs.readFile("async-test.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("읽기 에러", err);
  }
  console.log("비동기 파일 읽기", data);
});

// 문제4 : async-hello.txt 를 fs.readFile로 읽어오기
fs.readFile("async-hello.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("비동기 읽기 에러!", err);
  }

  console.log("비동기 파일 읽기!", data);
});

// 비동기 파일 관리 - Promise
const fsPromise = require("fs").promises;

const fileOp = async () => {
  try {
    // writeFile은 리턴 타입이 promise
    await fsPromise.writeFile("promise-test.txt", "Promise Hello World");
    console.log("promise1 파일 쓰기 완료");

    // 파일 읽기
    const data = await fsPromise.readFile("promise-test.txt", "utf-8");
    console.log("파일 읽기", data);
  } catch (e) {
    console.log(e);
  }
};

fileOp();

// 문제5 : fileOp2 함수를 만들고 promise 방식으로 promise-hello.txt 넣고
// 안녕하세요 프로미스 방식으로 파일을 읽는 연습을 하고 있어요 쓰고, promise-hello.txt 다시 읽어서 콘솔에 출력
const fileOp2 = async () => {
  try {
    await fsPromise.writeFile(
      "promise-hello.txt",
      "안녕하세요. 프로미스 방식으로 파일을 읽는 연습을 하고 있어요"
    );
    console.log("promise2 파일 쓰기 완료");

    const data2 = await fsPromise.readFile("promise-hello.txt", "utf-8");
    console.log("pro2 파일 읽기", data2);
  } catch (e) {
    console.log(e);
  }
};

fileOp2();
