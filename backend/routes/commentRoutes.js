const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const commentController = require('../controllers/commentController');

const findComment = require('../middleware/commentMiddleware');
const findArticle = require('../middleware/articleMiddleware');


router.post('/:articleId/comment/',
    [
        body('content').isString().withMessage('Content must be a string'),
    ],
    findArticle,
    commentController.create);

router.get('/:articleId/comment/:commentId', 
    [
        param('commentId').isInt().withMessage('ID must be a integer')
    ],
    findComment,
    commentController.get);

router.patch('/:articleId/comment/:commentId', 
    [
        body('content').isString().withMessage('Content must be a string'),
    ],
    findComment,
    commentController.update);

router.delete('/:articleId/comment/:commentId', 
    findComment,
    commentController.delete);


module.exports = router;
