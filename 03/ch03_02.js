// npm i winston
// 콘솔 대신 로깅(로그 생성, 저장 등 기록 활동)
// winston logger 사용 방법
const winston = require("winston");

// 로그 기록하는 상수
// CreateLogger 설정 정보 입력
const logger = winston.createLogger({
  level: "info", // 로깅 레벨(info 이상의 로깅 레벨만 출력)
  format: winston.format.simple(), // 간단한 텍스트 형식
  transports: [
    // 로그를 출력할 곳을 배열로 지정
    new winston.transports.Console(), // 콘솔로 출력
    new winston.transports.File({
      // 파일로 저장(출력)
      // 파일 정보 설정
      filename: "app.log",
    }),
  ],
});

console.log("------ log level ------");
// error > 에러, warn > 경고, info > 일반 정보, debug > 디버깅, verbose > 전부
console.log("로그 레벨 : error > warn > info > debug > verbose");

logger.info("정보 - 일반적인 정보메시지를 출력할 때는 Info 사용");
logger.error("에러 - 에러가 발생했을 때 사용");
logger.warn("경고! - 주의가 필요한 메시지일때만 사용");
// 서버 로그 레벨을 Info로 설정하면 debug는 나오지 않음
logger.debug("디버그 - 개발 중에만 사용");

// Log formatting
const simpleLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(), // 시간 추가
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] : ${message}`;
    }) // 로그 포맷 변경
  ),
  transports: [new winston.transports.Console()],
});

simpleLogger.info("타임스탬프가 포함된 로그");
