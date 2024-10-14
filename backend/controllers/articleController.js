const { errorWrapper } = require("../util/errorUtil");
const { Article } = require("../models");

// CREAT
exports.create = async (req, res) =>
  errorWrapper(req, res, async () => {
    const { title, content } = req.body;
    const article = await Article.create({ title, content });
    res.status(201).json(article);
  });

// READ
exports.get = async (req, res) =>
  errorWrapper(req, res, async () => {
    res.status(200).json(req.article);
  });

// READ ALL
exports.getAll = async (req, res) =>
  errorWrapper(req, res, async () => {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  });

// UPDATE
exports.update = async (req, res) =>
  errorWrapper(req, res, async () => {
    const { title, content } = req.body;
    const article = req.article;

    // overwrite if empty
    article.title = title || article.title;
    article.content = content || article.content;

    const updatedArticle = await article.save();
    res.status(200).json(updatedArticle);
  });

// DELETE
exports.delete = async (req, res) =>
  errorWrapper(req, res, async () => {
    await req.article.destroy();
    res.status(204).json();
  });
