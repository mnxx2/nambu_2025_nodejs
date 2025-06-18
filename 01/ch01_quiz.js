// 문제1 배열 : [1, 2, '멈춰', 3, 4, true, false] 에서 멈춰가 나오면 멈추는 코드 작성
console.log('문제1');
const arr1 = [1, 2, '멈춰', 3, 4, true, false];
for(i in arr1) {
    if(arr1[i] == '멈춰') {
        break;
    }
    console.log(arr1[i]);
}

// 문제2 배열 [5, -10, 15, 20, 25] 에서 20 이상이 나오면 멈추는 코드 작성
console.log('문제2');
const arr2 = [5, -10, 15, 20, 25];
for(i in arr2) {
    if(arr2[i] >= 20) {
        break;
    }
    console.log(arr2[i]);
}

// 문제3 배열 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 에서 짝수만 나오는 코드 작성 continue 사용
console.log('문제3');
const arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for(i in arr3) {
    if(arr3[i] % 2 == 0) {
        console.log(arr3[i]);
    }
}

// 문제4 1부터 10까지 돌면서 3의 배수는 건너뛰고 나머지를 출력하는 코드 작성
console.log('문제4');
for(let i = 1; i < 11; i++) {
    if(i % 3 == 0) {
        continue;
    }
    console.log(i);
}

// 문제5 배열 ['사과', 1, '바나나', 2, '포도', false] 에서 문자열만 나오는 코드 작성
console.log('문제5');
const arr4 = ['사과', 1, '바나나', 2, '포도', false];
for(i in arr4) {
    if(typeof arr4[i] == 'string') {
        console.log(arr4[i]);
    }
}

// 문제6 클래스명은 CarInfo, 속성은 brand, color, model : string 타입
//      메소드는 drive() -> '모델 xx가 달리는 중', stop() -> '모델 xx가 멈췄습니다.'
//      객체를 2개 정도 생성 후에 drive, stop 메소드 호출
console.log('문제6');
class CarInfo {
    constructor(brand, color, model) {
        this.brand = brand;
        this.color = color;
        this.model = model;
    }

    drive() {
        console.log(`모델 ${this.model}가 달리는 중`);
    }

    stop() {
        console.log(`모델 ${this.model}가 멈췄습니다.`);
    }
}

const car1 = new CarInfo('KIA', 'white', 'EV9');
console.log(car1);
car1.drive();
car1.stop();

const car2 = new CarInfo('SAMSUNG', 'black', 'XM3');
console.log(car2);
car2.drive();
car2.stop();

// 문제7 CarInfo를 상속 받아서 ElectricCarInfo 생성
//      추가 속성은 battery,
//      추가로 charge() -> '모델 xx가 충전 중', stop() -> '모델 xx가 멈췄습니다.' 메소드 추가
//      객체를 2개 정도 생성 후 drive, stop 메소드 호출
console.log('문제7');
class ElectricCarInfo extends CarInfo {
    constructor(brand, color, model, battery) {
        super(brand, color, model);
        this.battery = battery;
    }

    charge() {
        console.log(`모델 ${this.model}가 충전 중`);
    }
}

const elecCar1 = new ElectricCarInfo('Benz', 'black', 'EQS SUV', 40000);
console.log(elecCar1);
elecCar1.charge();
elecCar1.drive();
elecCar1.stop();

const elecCar2 = new ElectricCarInfo('Tesla', 'black', 'Model S', 87000);
console.log(elecCar2);
elecCar2.charge();
elecCar2.drive();
elecCar2.stop();