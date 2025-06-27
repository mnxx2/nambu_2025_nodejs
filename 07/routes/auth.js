const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { validateRegister } = require("../middlewares/validation");

// authoController로 회원가입을 하기 전에 입력 데이터를 검증하기 위해 앞에 validateRegister 추가
router.post("/register", validateRegister, authController.register);
router.post("/login", authController.login);

module.exports = router;
