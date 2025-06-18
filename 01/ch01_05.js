// function
// 선언 함수
function add1(x, y) {
    return x + y;
}

console.log(add1(1, 2));

// 익명 함수
const add2 = function(x, y) {
    return x + y;
}

console.log(add2(2, 3));

// 화살표 함수
const add3 = (x, y) => {
    return x + y;
}

console.log(add3(3, 4));

// 콜백 함수
const ten = (cb) => {
    for(let i = 0; i < 10; i++) {
        cb();   // () 의미는 함수 실행
    }
}

ten(function() {
    console.log('call function');
})

// timeout 함수
setTimeout(function() {
    console.log('1초 뒤에 호출')
}, 1000)    // 1000ms -> 1s

// interval 함수
setInterval(function() {
    console.log('1초마다 계속 실행')
}, 1000)