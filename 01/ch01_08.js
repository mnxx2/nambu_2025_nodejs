// 구조 분해 - useState 에서 사용
const fruits = ["사과", "수박", "바나나", "오렌지"];

const [first, second] = fruits;
console.log(first, second);

// 객체 구조 분해
const student = {
  name: "정민아",
  age: 28,
  grade: "B",
};

// 아래와 같이 구조 분해 가능하지만 코드가 길어지므로 객체 구조 분해 사용
// const name = student.name;

// 객체 구조 분해 할당
const { name, age, grade } = student;
console.log(name, age, grade);

// 객체 구조 분해 - 다른 이름의 변수 할당
const { name: name1, age: age1, grade: grade1 } = student;
console.log(name1, age1, grade1);

const person = {
  name: "홍길동",
};

// 객체 구조 분해 후 기본값 설정
const { name: personName, age: personAge = 25 } = person;
console.log(personName, personAge);

// 객체를 매개변수로 사용 - React props 에서 사용
const printStudentInfo = ({ name, age, grade = "B" }) => {
  console.log("학생정보");
  console.log(`- 이름 : ${name}`);
  console.log(`- 나이 : ${age}`);
  console.log(`- 성적 : ${grade}`);
};

// 객체가 그대로 인자로 들어옴
printStudentInfo(student);

const book = {
  title: "자바스크립트 최고",
  author: "홍길동",
  publisher: "한빛",
};

// 문제1 : book 객체를 출력하는 함수 작성, printBook 매개변수 객체 구조 분해 할당 이용
const printBook = ({ title, author, publisher }) => {
  console.log(`제목 : ${title}`);
  console.log(`저자 : ${author}`);
  console.log(`출판사 : ${publisher}`);
};

printBook(book);

// 복잡한 객체 구조 분해
const user = {
  id: 1,
  info: {
    name: "홍길동",
    address: {
      city: "서울",
      street: "강남대로",
    },
  },
};

const {
  id,
  info: {
    name: userName,
    address: { city, street },
  },
} = user;

console.log(`ID : ${id}`);
console.log(`이름 : ${userName}`);
console.log(`도시 : ${city}`);
console.log(`거리 : ${street}`);

// city 변수 이름 -> cityName
const {
  id: id2,
  info: {
    name: userName2,
    address: { city: cityName, street: street2 },
  },
} = user;

console.log(`ID : ${id2}`);
console.log(`이름 : ${userName2}`);
console.log(`도시 : ${cityName}`);
console.log(`거리 : ${street2}`);

const colors = ["빨강", "파랑", "노랑", "초록", "보라"];

// 문제1 : 첫 번째 요소는 firstColor, 두 번째 요소는 SecondColor에 할당
const [firstColor, SecondColor, ...others] = colors;
console.log(firstColor, SecondColor, others);

// 문제2 : 함수 formatUserInfo 생성
const user1 = { name: "소지섭", age: 45, email: "so@email.com" };
const user2 = { name: "전종서", age: 30 };

const formatUserInfo = ({ name, age, email = "이메일 없음" }) => {
  return `이름은 ${name}, 나이는 ${age}, email은 ${email}`;
};

console.log(formatUserInfo(user1));
console.log(formatUserInfo(user2));
