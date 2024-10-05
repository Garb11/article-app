const { param } = require('express-validator');

const { errorWrapper } = require('../util/errorUtil')
const { Comment } = require('../models');
const findArticle = require('./articleMiddleware');


const fMiddleware = async (req, res, next) => 
  errorWrapper(req,res, async () => {
    const comment = await Comment.findByPk(req.params.commentId);
    if ((comment === undefined ) || (req.article.id !== comment.articleId)){
      return res.status(404).json({ error: 'Comment not found' });}
    req.comment = comment;
    next();
  });

const findComment = [
    param('commentId').isInt({gt: 0}).withMessage('Comment ID must be a positive integer'),
    findArticle,
    fMiddleware
  ];


module.exports = findComment;