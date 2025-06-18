// node.js 동작 방식의 느린 작업을 실행하는 Libuv api : timeout 사용
// 서버에서 데이터를 받는 부분
const fetchData = (callback) => {
  setTimeout(() => {
    const data = "서버에서 받은 데이터";
    callback(data);
  }, 1000);
};

// 서버에서 받은 데이터를 처리하는 내용 -> 데이터 파싱 등
const handleData = (data) => {
  console.log("콜백에서 받은 데이터", data);
};

// callback 함수로 호출할 때는 소괄호 생략
fetchData(handleData);

// callback 지옥을 해결하기 위해 개발된 promise
const fetchDataPromise = () => {
  // resolve와 reject는 둘 다 함수
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 작업 성공 여부
      const success = true;

      // 외부에서 혹은 db에서 데이터를 가지고 오는 로직이 있는 자리
      if (success) {
        // 성공했을 때 호출되는 함수
        resolve("Promise Data");
      } else {
        // 실패했을 떄 호출되는 함수
        reject();
      }
    }, 1000);
  });
};

// 호출과 동시에 실행
// 외부 라이브러리에서 promise - then/catch 형태로 함수 제공
fetchDataPromise()
  .then((data) => {
    // resolve -> data fetch가 성공했을 때
    console.log("Promise에서 받은 데이터", data);
  })
  .catch((error) => {
    // reject -> data fetch가 실패했을 때
    console.log("Promise 에러", error);
  });

// async / await
const getData = async () => {
  try {
    // resolve -> data fetch가 성공했을 때 처리 로직
    const data = await fetchDataPromise();
    console.log("async/await data", data);
  } catch (e) {
    // reject -> data fetch가 실패했을 때 처리 로직
    console.log("async/await 에러", error);
  }
};

getData();

// 문제1 : 2초 후에 '안녕하세요!' 라는 메시지를 출력하는 promise 만들고 실행
const greet = () => {
  // 아래의 부분 로직 구현, promise 안에는 함수 하나
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;

      if (success) {
        resolve("안녕하세요!");
      } else {
        reject();
      }
    }, 2000);
  });
};

greet().then((message) => {
  console.log(message);
});

// 문제2 : async / await 를 사용해 greet 함수 사용
async function sayHi() {
  try {
    const hi = await greet();
    console.log(hi);
  } catch (e) {
    console.log("문제2 에러", e);
  }
}

sayHi();
