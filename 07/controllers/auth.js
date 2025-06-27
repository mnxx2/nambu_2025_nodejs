// 인증 관련 컨트롤러
const models = require("../models");
const bcrypt = require("bcryptjs"); // 암호화
const { generateAccessToken } = require("../utils/token");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  // password 암호화
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await models.User.create({
    email: email,
    name: name,
    password: hashedPassword,
  });

  res.status(201).json({ message: "OK", data: user });
};

// 로그인 컨트롤러
const login = async (req, res) => {
  const { email, password } = req.body;

  // 1. 이메일로 사용자가 있는지 확인
  const user = await models.User.findOne({ where: { email: email } });

  // 2. 사용자가 없으면 잘못된 이메일, 비밀번호라고 메시지 전달
  if (!user) {
    res.status(400).json({ message: "invalid email and password" });
  }

  // 3. 사용자가 있으면 비밀번호 비교
  // compare() : 두 인자를 비교해주는 함수, Boolean으로 반환
  // user.password는 암호화된 패스워드
  const isMatch = await bcrypt.compare(password, user.password);

  // 비밀번호가 일치하지 않으면 사용자에게 메시지 전달
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email and password" });
  }

  // 4. 정당한 사용자(이메일과 비밀번호가 일치) 임시허가증 발급
  const accessToken = generateAccessToken(user);
  res.json({ message: "OK", accessToken: accessToken });
};

module.exports = {
  register,
  login,
};
