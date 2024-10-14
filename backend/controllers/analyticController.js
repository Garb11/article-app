const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

const { errorWrapper } = require("../util/errorUtil");
const { Article } = require("../models");
const { Comment } = require("../models");

exports.getCommentsAnalytics = async (req, res) =>
  errorWrapper(req, res, async () => {
    const { dateFrom, dateTo } = req.query;

    // database query
    const articlesWithComments = await Article.findAll({
      include: [
        {
          model: Comment,
          where: {
            createdAt: {
              [Op.between]: [new Date(dateFrom), new Date(dateTo)],
            },
          },
          required: true,
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    // Transforming data to the response format
    const result = articlesWithComments.map((article) => ({
      articleId: article.id,
      title: article.title,
      content: article.content,
      createdAt: article.createdAt,
      comments: article.Comments.map((comment) => ({
        commentId: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
      })),
    }));

    res.status(200).json(result);
  });
