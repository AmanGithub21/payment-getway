require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(8080, (req, res) => {
    console.log('Server running on PORT 8080');
})