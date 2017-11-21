const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require("path");
const index = require("./routes/index.js");
const post = require("./routes/post.js");
const user = require("./routes/user.js");
const metrics = require("./routes/metrics.js");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/post', post);
app.use('/user', user);
app.use('/metrics', metrics);

app.listen(8081, function() {
    console.log("listening on 8081")
})

module.exports = app;