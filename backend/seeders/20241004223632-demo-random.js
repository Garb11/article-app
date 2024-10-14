'use strict';

const maxSymbols = 15;
const defaultCount = 10;

const countArticl = Number.isInteger(process.env.ARTICLE_COUNT) || defaultCount;
const countComment = Number.isInteger(process.env.COMMENT_COUNT) || defaultCount;
const startId = 1; //Number.isInteger(process.env.START_ID) || defaultCount;


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // generating array articles
    const article_seed = Array.from({ length: countArticl }, (_, i) => ({
      // id: startId + i,
      title: `Article ${i}`,
      content: `${i} ` + Array(Math.floor((Math.random() * maxSymbols) + 1)).fill('bla').join(' '),
    }));
    
    // generating array comments
    const comment_seed = Array.from({ length: countComment * countArticl }, (_, i) => ({
      // id: startId + i,
      articleId: startId + (i%countComment),
      content: 'G' + Array(Math.floor((Math.random() * maxSymbols) + 2)).fill('O').join('') + "L",
    }));

    await queryInterface.bulkInsert('articles_tbl', article_seed);
    await queryInterface.bulkInsert('comments_tbl', comment_seed);
  },

  async down (queryInterface, Sequelize) {
  } 
};
