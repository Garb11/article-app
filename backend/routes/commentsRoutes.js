const express = require('express');
const router = express.Router();

const findArticle = require('../middleware/articleMiddleware');
const articleController = require('../controllers/commentController');


router.get('/:articleId/comments', findArticle, articleController.getAll);


module.exports = router;
