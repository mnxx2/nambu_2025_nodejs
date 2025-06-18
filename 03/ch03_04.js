// 인증 관련 모듈
const validator = require("validator");

// email 검증
const email = "test@example.com";
console.log(`이메일 검증 : ${email} 은 ${validator.isEmail(email)}`);

// url 검증
const url = "http://www.naver.com";
console.log(`URL 검증 : ${url} 은 ${validator.isURL(url)}`);

// ip 검증
const ip = "3.35.152.150";
console.log(`IP 검증 : ${ip} 는 ${validator.isIP(ip)}`);

// 전화번호 검증
const phone = "010-1234-5678";
// 한국의 번호를 검증한다고 locale 정보를 같이 넣어줘야함
console.log(
  `전화번호 검증 : ${phone} 는 ${validator.isMobilePhone(phone, "ko-KR")}`
);

// 숫자 검증
const num1 = "12345";
console.log(`숫자 검증 : ${num1} 는 ${validator.isNumeric(num1)}`);

// 날짜 검증
const date1 = "2025-08-20";
console.log(`날짜 검증 : ${date1} 는 ${validator.isDate(date1)}`);

// password 검증
const password1 = "Password123!";
// isStrongPassword는 비밀번호와 비밀번호 검증 설정을 지정하는 객체를 매개변수로 받음
const v1 = validator.isStrongPassword(password1, {
  minLength: 8, // 최소 길이 8글자
  minLowercase: 1, // 최소 소문자 1글자
  minUppercase: 1, // 최소 대문자 1글자
  minNumbers: 1, // 최소 숫자 1글자
  minSymbols: 1, // 최소 특수문자 1글자
});
console.log(`비밀번호 : ${password1} 은 ${v1}`);
