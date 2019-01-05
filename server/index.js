var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors'),
    path = require('path');

var app = express();

var staticDir = express.static(
    path.resolve(__dirname, 'public')
);
app.use(staticDir);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API running on port ${port}`);
});