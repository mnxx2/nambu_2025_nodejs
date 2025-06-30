const models = require("../models");

const createPost = async (req, res) => {
  const { title, content } = req.body;

  // 첨부파일 가져오기
  // 파일이 있으면 파일이름에 넣고 없으면 null
  let filename = req.file ? req.file.filename : null;
  filename = `/downloads/${filename}`;

  // user 정보가 있는지 확인 후 없으면 user 생성
  // let user = await models.User.findOne({
  //   where: { email: "saltbready@example.com" },
  // });

  // if (!user) {
  //   user = await models.User.create({
  //     name: "소금빵",
  //     email: "saltbready@example.com",
  //     password: "12345678",
  //   });
  // }

  // Attachments 추가
  let attachments = [];

  if (req.file) {
    // single file 처리
    attachments.push({
      filename: req.file.filename,
      originalname: Buffer.from(req.file.originalname, "latin1").toString(
        "utf8"
      ),
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } else if (req.files && req.files.length > 0) {
    // muliple file 처리
    attachments = req.files.map((file) => ({
      filename: file.filename,
      originalname: Buffer.from(file.originalname, "latin1").toString("utf8"),
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
    }));
  }

  console.log(title, content, req.user.id, attachments);

  const post = await models.Post.create({
    title: title,
    content: content,
    // authorId: user.id,
    authorId: req.user.id,
    // fileName: filename,
    attachments: attachments,
  });

  res.status(201).json({ message: "OK", data: post });
};

const getPostsAll = async (req, res) => {
  //   const posts = await models.Post.findAll();
  //   res.status(200).json({ message: "OK", data: posts });

  // pagination 추가
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10; // limit
  const offset = (page - 1) * pageSize;

  const totalPosts = await models.Post.count();

  const posts = await models.Post.findAll({
    include: [{ model: models.User, as: "author", attributes: ["name"] }],
    limit: pageSize,
    offset: offset,
  });
  const totalPages = Math.ceil(totalPosts / pageSize);

  res.status(200).json({
    message: "ok",
    data: {
      posts: posts,
      pagination: {
        currentPage: page,
        pageSize,
        totalItems: totalPosts,
        totalPages,
      },
    },
  });
};

const getPost = async (req, res) => {
  const id = req.params.id;
  const post = await models.Post.findByPk(id, {
    include: [{ model: models.User, as: "author", attributes: ["name"] }],
  });

  res.status(200).json({ message: "OK", data: post });
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  const post = await models.Post.findByPk(id);

  if (post) {
    if (title) post.title = title;
    if (content) post.content = content;

    await post.save();
    res.status(200).json({ message: "OK", data: post });
  } else {
    res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const result = await models.Post.destroy({
    where: { id: id },
  });

  if (result > 0) {
    res.status(200).json({ message: "게시글을 삭제했습니다." });
    // res.status(204).send()
  } else {
    res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  }
};

const createComment = async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;

  // 1. 게시글 존재 여부 확인
  const post = await models.Post.findByPk(postId);

  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  // 1.5 사용자 추가
  let user = await models.User.findOne({
    where: { email: "b@example.com" },
  });

  if (!user) {
    user = await models.User.create({
      name: "뉴진스",
      email: "new@example.com",
      password: "12345678",
    });
  }

  // 2. comment 추가
  const comment = await models.Comment.create({
    content: content,
    postId: postId,
    userId: user.id,
  });

  res.status(201).json({ message: "OK", data: comment });
};

const getCommentsAll = async (req, res) => {
  const postId = req.params.postId;

  const comments = await models.Comment.findAll({
    where: { postId: postId },
    include: [
      // user의 정보도 같이 가져오는 author라는 별칭으로 가져오고 비밀번호를 제외한 정보 조회
      // attributes를 주는 이유는 비밀번호를 조회 못하도록 하기 위해
      { model: models.User, as: "author", attributes: ["id", "name", "email"] },
    ],
    // createdAt 속성의 역순을 기준으로 조회
    order: [["createdAt", "DESC"]],
  });

  res.status(200).json({ message: "OK", data: comments });
};

const updateComment = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  const { content } = req.body;

  // 1. 게시물이 있는지 확인
  const post = await models.Post.findByPk(postId);

  // 없다면 404 반환
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  // 2. 댓글 가지고 오기
  const comment = await models.Comment.findOne({
    where: {
      id: commentId,
      postId: postId,
    },
  });

  if (!comment) {
    return res.status(404).json({ message: "post not found" });
  }

  // 3. 댓글 수정 및 저장
  if (content) comment.content = content;
  await comment.save();
  res.status(200).json({ message: "OK", data: comment });
};

const deleteComment = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;

  // 1. 게시물 존재 여부 확인
  const post = await models.Post.findByPk(postId);
  console.log(post);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  // 2. 댓글 삭제
  const result = await models.Comment.destroy({
    where: { id: commentId, postId: postId },
  });

  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "comment not found" });
  }
};

module.exports = {
  createPost,
  getPostsAll,
  getPost,
  updatePost,
  deletePost,
  createComment,
  getCommentsAll,
  updateComment,
  deleteComment,
};
