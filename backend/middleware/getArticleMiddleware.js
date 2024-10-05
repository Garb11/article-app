const { param, validationResult } = require('express-validator');

const { errorHandle } = require('../util/errorUtil')
const { Article } = require('../models');


const fMiddleware = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) { return res.status(400).json({errors: errors.array()});}
      const article = await Article.findByPk(req.params.articleId);
      if (!article) {return res.status(404).json({ error: 'Article not found' });}
      req.article = article;
      next();
    } catch (err) {
      errorHandle(err, req, res)
      return res
    }
  }

const findArticle = [
    param('articleId').isInt({ gt: 0 }).withMessage('Article ID must be a positive integer'),
    fMiddleware
  ];


module.exports = findArticle;