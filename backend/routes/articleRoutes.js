const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const articleController = require('../controllers/articleController');
const findArticle = require('../middleware/articleMiddleware');


router.post('',
    [
        body('title').isString().withMessage('Title must be a string'),
        body('content').isString().withMessage('Content must be a string'),
    ],
    articleController.create);

router.get('/:articleId', 
    findArticle,
    articleController.get
);

router.patch('/:articleId', 
    [
        body('title').optional().isString().withMessage('Title must be a string'),
        body('content').optional().isString().withMessage('Content must be a string'),
        body().custom((body) => {
            if (!body.title && !body.content) {
              throw new Error('At least one field (title or content) must be provided');
            }
            return true;
        }),
    ],
    findArticle,
    articleController.update);

router.delete('/:articleId', 
    findArticle,
    articleController.delete);

module.exports = router;
