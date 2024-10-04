const express = require('express');


const env = process.env.NODE_ENV
const PORT = 3000;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
