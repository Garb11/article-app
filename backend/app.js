const express = require('express');
const retry = require('async-retry');

const db = require('./models')


const env = process.env.NODE_ENV
const PORT = 3000;

const app = express();

app.use(express.json());

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
    }
})();
