const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config({ path: path.join(__dirname, "sample.env") });

if (dotenv.error) {
    throw new Error(dotenv.error);
}
const { SERVER_PORT = 3000 } = dotenv.parsed;

const app = express();

app.use(cors());

// serve assets
app.use(express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.listen(SERVER_PORT);
