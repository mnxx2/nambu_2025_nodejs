// 반복문
let arr = [5, 23, 'hello', true, 'world', -9];
console.log(arr);
console.log(arr[1]);    // 선택 출력 : 인덱스 활용

console.log('-------- for ----------');
// for (초기조건; 종료조건; 증감식)
for (let i = 0; i < arr.length; i++) {
    console.log(`${i} is ${arr[i]}`);
}

console.log('-------- for in ---------');
// for .. in : i에 index가 담긴다
for(i in arr) {
    console.log(`${i} is ${arr[i]}`);
}

console.log('-------- for of ---------');
// for .. of : e에 요소가 담긴다 
for(e of arr) {
    console.log(e);
}

console.log('-------- break ---------');
// break : 조건에 해당하는 값을 만나면 루프 완전 탈출, 이후의 루프 실행하지 않음
for (i in arr) {
    if(typeof arr[i] == 'string') {
        break;
    }
    console.log(arr[i]);
}

console.log('-------- continue ---------');
// continue : 조건에 해당하는 값을 만나면 루프 탈출, 이후의 루프 실행
for (i in arr) {
    if(typeof arr[i] == 'string') {
        continue;
    }
    console.log(arr[i]);
}