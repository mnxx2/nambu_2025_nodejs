// filter, map 함수

const users = [
  { id: 1, name: "한지민", age: 25, score: 85 },
  { id: 2, name: "김민수", age: 22, score: 88 },
  { id: 3, name: "이수진", age: 36, score: 83 },
  { id: 4, name: "박지훈", age: 12, score: 58 },
  { id: 5, name: "오세훈", age: 26, score: 92 },
  { id: 6, name: "윤아름", age: 27, score: 29 },
  { id: 7, name: "최유리", age: 33, score: 99 },
  { id: 8, name: "정현우", age: 18, score: 65 },
];

// 배열을 순회하며 return 조건식(판별식)에 맞는 객체/요소만 추출헤사 세 베열 셍성
const youngs = users.filter((user) => {
  console.log(user);
  return user.age < 25;
});
// sql -> select * from users where age < 25;

console.log(youngs);

// 문제1 : users에서 점수가 80점 미만인 user 추출
const student1 = users.filter((user) => {
  return user.score < 80;
});
console.log(student1);

// map() 함수 : 배열을 순회하며 조건에 맞게 값을 추출/변경하는 함수
const userNames = users.map((user) => {
  return user.name;
});

console.log(userNames);

// 문제2 : 아이디와 이름만 반환하는 배열 생성
const idNames = users.map((user) => {
  return { id: user.id, name: user.name };
});

console.log(idNames);

// 문제3 : 성적이 80졈 이상인 유저의 아이디, 이름 성적 추출
const student2 = users
  .filter((user) => {
    return user.score >= 80;
  })
  .map((user) => {
    return { id: user.id, name: user.name, score: user.score };
  });

console.log(student2);

// forEach : 새로운 배열을 생성하지 않고 배열을 순회하는 반복문
users.forEach((user) => {
  console.log(`${user.name}님의 점수는 ${user.score}입니다.`);
});

// reduce() 함수
const totalScore = users.reduce((sum, user) => {
  return sum + user.score;
  // sum의 초기값은 0
}, 0);
console.log(totalScore);

// 문제4 : 나이가 25 이상인 사람들의 전체 점수 구하기
const scoresOf25 = users
  .filter((user) => {
    return user.age >= 25;
  })
  .reduce((sum, user) => {
    return sum + user.score;
  }, 0);
console.log(scoresOf25);

// sort() 함수
const sortedByAge = [...users].sort((a, b) => {
  return a.age - b.age;
  // a.age - b.age 가 음수이면 a가 b 앞으로
  // a.age - b.age 가 양수이면 a가 b 뒤로
  // a.age - b.age 가 0이면 아무것도 하지 않음
}); // 나이 오름차순 정렬
console.log(sortedByAge);
