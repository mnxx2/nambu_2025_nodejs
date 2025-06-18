// 조건문
let date = new Date();

if (date.getHours() < 12) {
    console.log("오전");
} else {
    console.log('오후');
}

// 삼항 연산자
const hour = date.getHours();
const timeOfDay = hour < 12 ? "오전" : "오후";
console.log(`현재는 ${timeOfDay} 입니다.`);

// 문제1 : 30도가 넘어가면 "더운 날씨 입니다" 출력
//        20도가 넘어가면 "따듯한 날씨 입니다" 출력
//        10도가 넘어가면 "선선한 날씨 입니다" 출력
//        나머지는 "추운 날씨입니다" 출력
const temp = 25;
if (temp > 30) {
    console.log("더운 날씨 입니다");
} else if(temp > 20) {
    console.log("따뜻한 날씨 입니다");
} else if(temp > 10) {
    console.log("선선한 날씨 입니다");
} else {
    console.log("추운 날씨 입니다");
}

// 문제2 : switch문으로 요일 출력, day == 1 -> 월요일, 2 -> 화요일, ...
const day = date.getDay();
console.log(day);
switch(day) {
    case 1 :
        console.log('월요일');
        break;
    case 2 :
        console.log('화요일');
        break;
    case 3:
        console.log('수요일');
        break;
    case 4 :
        console.log('목요일');
        break;
    case 5 :
        console.log('금요일');
        break;
    case 6 :
        console.log('토요일');
        break;
    case 7 :
        console.log('일요일');
        break;
    default : 
        console.log('알 수 없는 요일');
}

// 짧은 조건문
// 값 뒤에 or 연산자를 사용하면 값1 or 값2가 된다
// 값1이 없다면 값2를 사용한다는 뜻으로 값1이 null 혹은 '', 0인 경우 해당된다
const name = '';
const displayName = name || '익명님';
console.log(`환영합니다 ${displayName}`);

// nullish 병합연산자
// 값이나 변수 뒤에 ?? 를 사용하면 값1 or 값2가 되는데
// 이때는 값1이 null 또는 Undefined인 경우 값2를 사용한다
const userInput = null;
const defaultValue = '기본값';
const result = userInput ?? defaultValue;
console.log(`결과 : ${result}`);

// 조건문 실행
// 변수 && 실행문 형태로 사용
// 변수 뒤에 사용되며 해당 변수가 True인 경우에만 && 뒤의 실행문이 실행된다
const isLoggedIn = true;
isLoggedIn && console.log('로그인 되었습니다');