// 환경변수 설정 관련 모듈
// .env 파일을 프로그램상에 로드
require("dotenv").config();

// 사용할 때는 process.env.작성변수명
console.log(`서버 포트 : ${process.env.PORT}`);

// 문제1 : DB_NAME, DB_USER, DB_PASSWORD, API_KEY, NODE_ENV 출력
console.log(`DB_NAME : ${process.env.DB_NAME}`);
console.log(`DB_USER : ${process.env.DB_USER}`);
console.log(`DB_PASSWORD : ${process.env.DB_PASSWORD}`);
console.log(`API_KEY : ${process.env.API_KEY}`);
console.log(`NODE_ENV : ${process.env.NODE_ENV}`);

// 값이 없으면 undefined 출력됨
// || 파이프라인 기호로 값이 없을 경우 기본값 부여
console.log(`디피 포트 : ${process.env.DB_PORT || 5432}`);

// 조건문에 적용
if (!process.env.OPENAPI_API_KEY) {
  console.log(`오픈 API의 KEY가 필요합니다.`);
}

const isDevelopment = process.env.NODE_ENV === "development";
if (isDevelopment) {
  console.log("개발 환경에서의 로직 처리");
} else {
  console.log("운영 환경에서의 로직 처리");
}
