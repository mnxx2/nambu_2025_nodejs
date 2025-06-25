"use strict";

// 필요한 모듈 import
const fs = require("fs"); // 파일시스템 : todos.js 같은 파일을 읽을 때 사용
const path = require("path"); // 경로 import
const Sequelize = require("sequelize"); // sequelize import
const process = require("process"); // 환경 변수 처리 위해서 import
const basename = path.basename(__filename); // index.js 위치한 디렉토리 위치
const env = process.env.NODE_ENV || "development"; // 환경변수에 NODE_ENV development
const config = require(__dirname + "/../config/config.json")[env]; // config.config.json
const db = {};

// sequelize 객체 생성
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// 현재 Index.js 디렉토리에 있는 모든 파일을 읽는다
// 확장자가 없거나 .js 가 아니거나, .test.js로 끝나는 파일이 아닌 경우는 모두 읽음
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    // 읽은 파일 목록을 순회 하면서 [todo.js] 형태로 반환
    // 파일 하나씩 여기서 작업
    // require('./todo.js')
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );

    // db["Todo"] = Todo 객체가 담겨있다
    db[model.name] = model;
  });

// foreign key 관련 설정
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
