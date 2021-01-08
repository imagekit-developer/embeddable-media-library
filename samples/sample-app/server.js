const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config({ path: path.join(__dirname, ".env") });

if (dotenv.error) {
    throw new Error(dotenv.error);
}
const { SERVER_PORT = 3000 } = dotenv.parsed;

const app = express();

app.use(cors());

// serve assets
app.use(express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))

// Include Media Library Widget and CKEditor plugins in assets
app.use('/static/js', express.static(path.join(__dirname + '/node_modules/imagekit-media-library-widget/dist/')));

app.listen(SERVER_PORT);
