const express = require('express');
const retry = require('async-retry');

const { errorHandle, logError } = require('./util/errorUtil');
const db = require('./models');

const articleRoutes = require('./routes/articleRoutes');
const articlesRoutes = require('./routes/articlesRoutes');
const commentRoutes = require('./routes/commentRoutes');
const commentsRoutes = require('./routes/commentsRoutes');


const env = process.env.NODE_ENV;
const PORT = 3000;

const app = express();

app.use(express.json());
app.use('/article', articleRoutes);
app.use('/articles', articlesRoutes);
app.use('/article', commentRoutes)
app.use('/article', commentsRoutes)

app.use((req, res, n) => {res.status(404).json({error:'Not Found'});});
app.use((err, req, res, n) => errorHandle(err, req, res));


(async () => {
    try {
      await retry(async () => {
        await db.sequelize.authenticate()
            .then(() => {
                app.listen(PORT, () => {
                    console.log(`Server listening on port ${PORT}`);
                });
            })
      }, 
      {
        retries: 5,
        minTimeout: 2400,
      });
    } catch (err) {
        logError(err, 'Unable to connect to the database');
    }
})();
