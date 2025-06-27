const models = require("../models");
const bcrypt = require("bcryptjs");

// 암호화 비밀번호 추가
const createUser = async (req, res) => {
  const { email, password, name } = req.body; // 회원가입에 사용
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await models.User.create({
    name,
    email,
    password: hashedPassword, // 구조분해할당
  });

  res.status(201).json({ message: "OK", data: user });
};

const findAll = async (req, res) => {
  const users = await models.User.findAll();

  res.status(200).json({ message: "OK", data: users });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { password, name } = req.body;
  const user = await models.User.findByPk(id);

  if (user) {
    if (password) user.password = password;
    if (name) user.name = name;

    await user.save();
    res.status(200).json({ message: "OK", data: user });
  } else {
    res.status(404).json({ message: "user not found" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const result = await models.User.destroy({ where: { id: id } });

  if (result) {
    res.status(200).json({ message: "OK" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
};

// email로 user 정보 찾기
const findUserByEmail = async (email) => {
  const user = await models.User.findOne({
    where: { email: email },
  });

  return user;
};

module.exports = {
  createUser,
  findAll,
  updateUser,
  deleteUser,
  findUserByEmail,
};
