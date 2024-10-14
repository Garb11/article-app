const { param } = require("express-validator");

const { errorWrapper } = require("../util/errorUtil");
const { Article } = require("../models");

const fMiddleware = async (req, res, next) =>
  errorWrapper(req, res, async () => {
    const article = await Article.findByPk(req.params.articleId);
    if (!article) {
      return res.status(404).json({ errors: [{ msg: "Article not found" }] });
    }
    req.article = article;
    next();
  });

const findArticle = [
  param("articleId")
    .isInt({ gt: 0 })
    .withMessage("Article ID must be a positive integer"),
  fMiddleware,
];

module.exports = findArticle;
