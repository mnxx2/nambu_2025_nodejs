const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  let token;

  // authorization : headers에 Beaerer eyxxxxx 값이 들어간다
  // 이중에서 뒤의 토큰 부분만 가지고 오기 위해 공백을 기준으로 두번째(index 1) 값을 가져온다
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "not authorized" });
  }

  // jwt.verify() : 토큰 검증 함수
  jwt.verify(token, "access_token", (err, user) => {
    if (err) {
      return res.status(401).json({ message: "not authorized" });
    }

    req.user = user;
    next(); // 다음 미들웨어 또는 핸들러 함수로 이동
  });
};

module.exports = {
  authenticate,
};
