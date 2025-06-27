const winston = require("winston");

// logger 설정
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(), // 콘솔에 출력
    new winston.transports.File({ filename: "app.log" }), // 파일로 생성, 출력
  ],
});

const logging = (req, res, next) => {
  const start = Date.now();

  // res.on()의 두번째 함수는 요청이 끝났을 때(사용자에게 데이터가 가기 전) 호출되어 로깅을 남긴다
  res.on("finish", () => {
    const duration = Date.now() - start; // 요청 처리시간
    // 로그에 남길 정보 : 메소드, url, 요청 상태, 요청을 처리하는데 걸린 시간
    logger.info(`${req.method} ${req.url} - ${res.statusCode} (${duration})`);
  });

  next();
};

module.exports = {
  logger,
  logging,
};
