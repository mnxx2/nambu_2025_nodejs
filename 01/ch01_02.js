// 변수 선언
let pi;
console.log(pi);    // undefined

// 값 설정
pi = 3.141592
console.log(pi);

let radius = 12;
console.log(`넓이 : ${pi * radius * radius}`);  // pi r^2
console.log(`둘레 : ${pi * 2 * radius}`);   // 2 pi r

// 문제1 : area 라는 변수를 만들고 radius 15 인 경우 area 넓이 계산
radius = 15;
let area = pi * radius * radius;
console.log(`넒이 : ${area}`);

// 문제2 : 사각형의 넓이를 계산 width, height 에서 각각 값을 넣고 area2라는 변수에 넓이 저장 후 출력
let width = 30;
let height = 25;
let area2 = width * height;
console.log(`사각형의 넓이 : ${area2}`);

// 증감 연산자
let num = 0;
num++;  // num = num + 1
console.log(num);   // 1
num--;  // num = num - 1
console.log(num);   // 0

// 형변환 : typeof, String(), Number(), Float(), parseInt()...
console.log(String(52));    // num -> string : "52"
console.log(typeof String(52)); // String

console.log(Number("42"));  // string -> num : 42
console.log(typeof Number("42"));  //number

console.log(parseInt("1234"));  // 1234
console.log(parseInt("1234.56"));   // 1234
console.log(parseFloat("1234.56")); // 1234.56

// NaN
console.log(Number("hello"));   // NaN
console.log(isNaN(Number("hello")));    // true

// type check
console.log(typeof 10); // number
console.log(typeof "hello");    // string
console.log(typeof true);   // boolean
console.log(typeof function () {}); // function
console.log(typeof {});     // object
console.log(typeof []);     // object

// 상수
const test = "변경불가";
test = "값이 변경되나요?";
console.log(test);