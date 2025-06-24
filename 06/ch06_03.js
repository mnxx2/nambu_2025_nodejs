// 문제 todos 생성
// id  - integer (기본 생성)
// 할일 : task - varchar
// 할일 설명 : description - text
// 완성 여부 : completed - boolean
// 생성 일자 : createdAt - datetime (기본 생성)
// 중요도 : priority - integer default 1

// 디폴트값 모델 생성 참고
// completed: {
//   type: DataTypes.BOOLEAN,
//   defaultValue: false
// }
// priority : {
//     type : DataTypes.INTEGER,
//     defaultValue : 1
// }

// 필요한 모듈 Import
const { Sequelize, Model, DataTypes, Op } = require("sequelize");

// sequelize 객체 생성
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

// 문제1 : Todo 모델, todos 생성
const Todo = sequelize.define(
  "Todo",
  {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "todos",
  }
);

(async () => {
  await sequelize.sync({ force: false });

  // 문제2 : Todo 데이터를 2개 입력
  const todo1 = await Todo.create({
    task: "타입스크립트 스터디",
    description: "남부여성발전센터 교육생 스터디",
  });
  console.log(`--- todo1 --- : ${JSON.stringify(todo1)}`);

  const todo2 = await Todo.create({
    task: "보드게임",
    description: "꼭 공부해서 다 이기겠습니다",
    completed: false,
    priority: 2,
  });
  console.log(`--- todo2 --- : ${JSON.stringify(todo2)}`);

  // 문제3 : Todo 데이터를 전체 조회
  const todoAll = await Todo.findAll();
  console.log(`--- todoAll --- : ${JSON.stringify(todoAll)}`);

  // 문제4 : Todo 아이디가 2번인 항목조회
  const todoPk = await Todo.findByPk(2);
  console.log(`--- todoPk --- : ${JSON.stringify(todoPk)}`);

  // 문제5 : Todo 아이디가 2번인 항목의 Completed를 완료로 바꿈
  await Todo.update(
    {
      completed: true,
    },
    {
      where: {
        id: 2,
      },
    }
  );
  const todoUpdate = await Todo.findByPk(2);
  console.log(`--- todoUpdate --- : ${JSON.stringify(todoUpdate)}`);

  // 문제6 : Todo 아이디가 2번인 항목 삭제
  await Todo.destroy({
    where: {
      id: 2,
    },
  });
  const todoDelete = await Todo.findByPk(2);
  console.log(`--- todoDelete --- : ${JSON.stringify(todoDelete)}`);
})();
