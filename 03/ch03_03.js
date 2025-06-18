// 날짜 관련 모듈 사용 - Moment
const moment = require("moment");

const nowDate = moment();
console.log(nowDate);

// 포맷 지정
// YYYY : 년도, MM : 월(06 형태), DD : 일(02 형태) HH : 시 mm : 분 ss : 초
console.log(nowDate.format("YYYY-MM-DD HH:mm:ss"));
console.log(nowDate.format("YYYY년 MM월 DD일"));
console.log(nowDate.format("YYYY년 MM월 DD일 HH시 mm분 ss초"));

// 문제1 : 현재 날짜 + 시각을 2025/06/18 형태로 출력
console.log(nowDate.format("YYYY/MM/DD"));

// 특정 날짜 의 문자열을 모멘트 객체 형태로 변경
const dateMoment = moment("2024-03-30");
console.log(dateMoment);

// 시간 추가 및 빼기 : days, months, weeks 등
const nextDays = nowDate.add(7, "days");
console.log(nextDays);

// 시간 차이 계산
// nowDate는 add() 함수로 날짜 자체가 변경되었기 때문에 다른 변수 사용
const startDate = moment();
const endDate = moment("2025-08-20");
const diffDay = endDate.diff(startDate, "days");
console.log("과정 종료까지 남은 일수 : ", diffDay);

// 문제2 : 오늘부터 100일 후의 날짜를 YYYY년 MM일 DD일로 출력
const nowDate1 = moment();
const days100 = nowDate1.add(100, "days");
console.log(
  `오늘(${nowDate1.format(
    "YYYY년 MM월 DD일"
  )})부터 100일 후의 날짜 : ${days100.format("YYYY년 MM일 DD일")}`
);

// 문제3 : 2024-03-15 부터 2025-09-20 까지 몇 개월이 지났는지 계산
const days0315 = moment("2024-03-15");
const days0920 = moment("2025-09-20");
const qus2DiffMonth = days0920.diff(days0315, "months");
console.log(`2024-03-15부터 2025-09-20까지 개월 수 : ${qus2DiffMonth}`);

// 문제4 : 크리스마스까지 남은 일수 계산
const nowDate2 = moment();
const christmas = moment("2025-12-25");
const qus3DiffDays = christmas.diff(nowDate2, "days");
console.log(`크리스마스까지 남은 일수 : ${qus3DiffDays}`);
