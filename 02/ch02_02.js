// 파일 경로 관리
const path = require("path");

// __dirname : 현재 파일이 있는 디렉터리 절대경로를 가져옴
const fullpath = path.join(__dirname, "files", "test.txt");
console.log(`전체 경로 : ${fullpath}`);

// 문제1 : fullPath2 변수에 현재디렉터리/files/tasks/jobs/01.txt 경로 생성
const fullPaht2 = path.join(__dirname, "files", "tasks", "jobs", "01.txt");
console.log(`문제1 전체 경로 : ${fullPaht2}`);

// 경로에 대한 정보 분리
const pathParts = path.parse(fullpath);
console.log(pathParts);

// 문제2 : fullPath2를 parse를 이용해 경로 분리, pathParts2
const pathParts2 = path.parse(fullPaht2);
console.log(pathParts2);

// 확장자 변경
// extname() : 해당 파일의 확장자를 가져온다
const ext = path.extname("text.txt");
console.log(ext);

// 경로 생성 후 디렉터리 생성
const fs = require("fs");
const dirPath = path.join(__dirname, "new-dir");
console.log(dirPath);

// 경로가 있으면 true, 없으면 false -> 없을때만 생성
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// 문제1 : dirPath2 변수를 만들고 현재 디렉터리 밑에 tasks 디렉터리 생성
const dirPath2 = path.join(__dirname, "tasks");
console.log(dirPath2);

if (!fs.existsSync(dirPath2)) {
  fs.mkdirSync(dirPath2);
}

// 여러 디렉터리 한번에 생성
const dirPath3 = path.join(__dirname, "tasks", "jobs"); // 경로 만들고
if (!fs.existsSync(dirPath3)) {
  // 경로가 존재하는지 체크
  fs.mkdirSync(dirPath3, { recursive: true }); // 실제 디렉터리 생성
  // 에러가 난다면 mkdirSync()의 두번째 인자로 {recursive : true}
}

// 디렉터리 생성 후 파일 생성
const filePath = path.join(dirPath3, "test.txt");
fs.writeFileSync(filePath, "디렉터리 생성 후 파일 생성 테스트");

// 문제2 : 현재 디렉터리 밑에 main/src/code/javascript.txt 파일을 생성하고
//        파일 안에 "자바스크립트 테스트 파일입니다." 작성
// 경로 생성
const dirPath4 = path.join(__dirname, "main", "src", "code");

// 디렉터리 생성
if (!fs.existsSync(dirPath4)) {
  fs.mkdirSync(dirPath4, { recursive: true });
}

// 파일 생성
const filePath2 = path.join(dirPath4, "javascript.txt");
// 내용 입력
fs.writeFileSync(filePath2, "자바스크립트 테스트 파일입니다.");

// 디렉터리명 변경
const newDirPath = path.join(__dirname, "rename-dir");
fs.renameSync(dirPath, newDirPath); // 경로 변경 == 디렉토리 변경 (터미너의 mv와 같음)

// 디렉터리 삭제
fs.rmdirSync(newDirPath);
