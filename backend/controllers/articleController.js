const { validationResult } = require("express-validator");

const { errorHandle } = require('../util/errorUtil');
const { Article } = require('../models');

// READ 
exports.getArticle = async (req, res) => {
  try {   
    const article = req.article;
    res.status(200).json(article);  
  } catch (err) {
    errorHandle(err, req, res);
    return res;
  }
};

// CREAT
exports.createArticle = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({errors: errors.array()}); }
    const { title, content } = req.body;
    const article = await Article.create({ title, content });
    res.status(201).json(article);
  } catch (err) {
    errorHandle(err, req, res);
    return res;
  }
};

// READ ALL
exports.getAllArticles = async (_, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (err) {
    errorHandle(err, req, res);
    return res;
  }
};

// UPDATE
exports.updateArticle = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({errors: errors.array()});}
    const { title, content } = req.body;
    const article = req.article;
    article.title = title || article.title;
    article.content = content || article.content;
    const updatedArticle = await article.save();
    res.status(200).json(updatedArticle);
  } catch (err) {
    errorHandle(err, req, res);
    return res;
  }
};

// DELETE
exports.deleteArticle = async (req, res) => {
  try {
    const article = req.article;
    await article.destroy();
    res.status(204).json();
  } catch (err) {
    errorHandle(err, req, res);
    return res;
  }
};
