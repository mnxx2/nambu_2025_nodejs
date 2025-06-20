app.get("/user", (req, res) => {
  const username = req.query.username;
  // 안전: 매개변수화된 쿼리 사용
  //   const sql = `SELECT * FROM users WHERE username = '${username}'`;
  const sql = `SELECT * FROM users WHERE username = ?`;
  const user = db.prepare(sql).get(username);
  res.json(user);
});

// GET /user?username=이지훈
// GET /user?username=admin' OR '1'='1

// SELECT * FROM users WHERE username = 'admin' OR '1'='1'
// sql injection
