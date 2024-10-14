const { errorWrapper } = require("../util/errorUtil");

// CREATE
exports.create = async (req, res) =>
  errorWrapper(req, res, async () => {
    const { content } = req.body;
    const comment = await req.article.createComment({ content: content });
    res.status(201).json(comment);
  });

// READ
exports.get = async (req, res) =>
  errorWrapper(req, res, async () => {
    res.status(200).json(req.comment);
  });

// READ ALL
exports.getAll = async (req, res) =>
  errorWrapper(req, res, async () => {
    const comments = await req.article.getComments();
    res.status(200).json(comments);
  });

// UPDATE
exports.update = async (req, res) =>
  errorWrapper(req, res, async () => {
    const { content } = req.body;
    req.comment.content = content;
    const updatedComment = await req.comment.save();
    res.status(200).json(updatedComment);
  });

// DELETE
exports.delete = async (req, res) =>
  errorWrapper(req, res, async () => {
    await req.comment.destroy();
    res.status(204).json();
  });
