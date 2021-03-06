const express = require('express');
var router = express.Router();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require("path");
const index = require("./routes/index.js");
const post = require("./routes/post.js");
const user = require("./routes/user.js");

const client = require('prom-client');
// const metrics = require("./routes/metrics.js");
//Enable collection of default metrics
const metricsInterval = client.collectDefaultMetrics();


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
})

// Runs before each requests
app.use((req, res, next) => {
    res.locals.startEpoch = Date.now();
    next();
})

app.get('/metrics', (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(client.register.metrics());
});
app.use('/', index);
app.use('/post', post);
app.use('/user', user);

// Runs after each requests
app.use((req, res, next) => {
    if (req.route) {
        const responseTimeInMs = Date.now() - res.locals.startEpoch;
        httpRequestDurationMicroseconds
            .labels(req.method, req.route.path, res.statusCode)
            .observe(responseTimeInMs);
    }
})

const server = app.listen(8081, function () {
    console.log("listening on 8081");
})

// Graceful shutdown
process.on('SIGTERM', () => {
    clearInterval(metricsInterval);

    server.close((err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        process.exit(0);
    })
})

module.exports = server;