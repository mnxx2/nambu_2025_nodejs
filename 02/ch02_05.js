// OS 모듈
const os = require("os");

// 운영체제(os) 정보
console.log(`운영체제 : ${os.type()}`);
console.log(`플랫폼 : ${os.platform()}`);
console.log(`아키텍처 : ${os.arch()}`);
console.log(`호스트명 : ${os.hostname()}`);

// cpu 정보
const cpus = os.cpus();
console.log(`cpu 코어수 : ${cpus.length}`);
// 코어의 개수가 8개이므로 그 중 첫번째의 모델을 지정해 출력
console.log(`cpu 모델 : ${cpus[0].model}`);
console.log(`cpu 속도 : ${cpus[0].speed} MHz`);

// 메모리 정보
// 바이트 단위로 들어오지만 GB로 사용할 예정이기 때문에
// KB, MB, GB 순으로 1024를 나눠줘야 한다.  KB.     MB.   GB
const totalMemoryGB = os.totalmem() / 1024 / 1024 / 1024;
const freeMemoryGB = os.freemem() / 1024 / 1024 / 1024;
console.log("\n메모리 정보 : ");
console.log(`총 메모리 : ${totalMemoryGB} GB`);
console.log(`사용 가능한 메모리 : ${freeMemoryGB.toFixed(2)} GB`);

// 사용자 정보
const userInfo = os.userInfo();
console.log("\n사용자 정보");
console.log(`사용자 이름 : ${userInfo.username}`);
console.log(`홈 디렉토리 :  ${userInfo.homedir}`);
console.log(`쉘 : ${userInfo.shell}`);
