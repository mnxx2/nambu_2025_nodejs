// 업로드 관련 미들웨어
const multer = require("multer");
const path = require("path");

const uploadDir = `public/uploads`;

// 멀터 저장소 설정
const storage = multer.diskStorage({
  // 도착지정보
  destination: `./${uploadDir}`,

  // 파일명을 유니크하게 저장
  filename: function (req, file, cb) {
    const fname =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    cb(
      null, // error 처리
      fname
    );
  },
});

// 파일저장을 위한 미들웨어 생성
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB로 파일크기 제한
  },
});
const uploadSingle = upload.single("file");
// upload 개수 제한
const uploadMultiple = upload.array("files", 5);

module.exports = {
  uploadSingle,
  uploadMultiple,
};
