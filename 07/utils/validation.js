const Joi = require("joi"); // 데이터 유효성 검사 도구 불러오기

// 유효성 검사를 위한 스키마 만들기 - joi 사용
// 스키마는 일종의 함수가 포함된 객체(함수)
const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    // 이메일이 유효하지 않을 경우 메시지
    "string.email": "유효한 이메일 형식이 아닙니다.",
    // 이메일이 입력되지 않을 경우 메시지
    "string.empty": "이메일은 필수 입력 항목입니다.",
  }),

  password: Joi.string().min(6).max(30).required().messages({
    // 비밀번호 최소 길이가 충족되지 않을 경우 메시지
    "string.min": "비밀번호는 최소 6자리 이상이어야 합니다.",
    // 비밀번호가 최대 길이를 초과했을 경우 메시지
    "string.max": "비밀번호는 최대 30자까지만 가능합니다.",
    // 비밀번호가 입력되지 않을 경우 메시지
    "string.empty": "비밀번호는 필수 입력 항목입니다.",
  }),

  name: Joi.string().min(2).max(10).required().messages({
    // 이름의 최소 길이가 충족되지 않을 경우 메시지
    "string.min": "이름은 최소 2자리 이상이어야 합니다.",
    // 이름의 최대 길이를 초과했을 경우 메시지
    "string.max": "이름은 최대 10자리까지만 가능합니다.",
    // 이름이 입력되지 않을 경우 메시지
    "string.empty": "이름은 필수 입력 항목입니다.",
  }),
});

module.exports = {
  registerSchema,
};
