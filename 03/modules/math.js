// 수학에 관련된 모듈
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// module 외부로 내보내기
module.exports = {
  add,
  subtract,
};
