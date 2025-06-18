// 객체 
// 예를 들어 이지훈 이라는 객체를 표현
// name='이지훈' age=40 job='developer' ...
// 이것을 모아 하나의 객체로 생성
const person1 = {
    name : '이지훈',
    age : 50,
    job : 'sw engineer'
}
console.log(person1.name, person1['name']);

// 객체 요소 추가
person1.hobby = ['cook', 'fising'];
console.log(person1);

// 객체의 키 목록 출력 : 순회에 사용
console.log(Object.keys(person1));

// 객체의 값 목록 출력
console.log(Object.values(person1));

// 객체 요소에 함수 추가
// this 사용으로 객체의 값 수정
person1.addAge = function() {
    this.age = this.age + 1;
}
person1.addAge();
console.log(person1);

// 클래스
class PersonInfo {
    constructor(name, age, address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    addAge(age) {
        this.age = this.age + age;
    }

    getAge() {
        return this.age;
    }
}

// 객체 인스턴스 생성
let p1 = new PersonInfo('정민아', 28, '부천시');
console.log(p1);

// 객체의 메소드 사용
p1.addAge(50);
console.log(p1.getAge());

// 상속
class Employee extends PersonInfo {
    constructor(name, age, address, salary) {
        super(name, age, address);
        this.salary = salary;
    }
}

let e1 = new Employee('홍길동', 60, '인천 부평', 10000000);
console.log(e1);

// try ~ catch
try {
    // 데이터베이스 커넥션 얻어와서 데이터베이스에 데이터 질의할 때 사용
    const arr = new Array(-1);
} catch(e) {    // 비정상 종료 예방
    // 데이터 질의 하다가 예외 발생했을 때 처리
    console.log('예외 발생', e);
} finally {
    // 데이터베이스 커넥션 닫아주기
    console.log('에외가 발생해도 이 작업은 반드시 필요');
}

// custom error
try {
    const err = new Error('나만의 에러');
    err.name = '나만의 에러';
    err.message = '나만의 에러 완성';
    throw err
} catch(e) {
    console.log(e.name, e.message)
}