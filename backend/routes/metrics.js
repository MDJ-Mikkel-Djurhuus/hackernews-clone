var express = require('express');
var router = express.Router();
const path = require("path");

const client = require('prom-client');
const register = new client.Registry();

router.get('/', (req, res) => {
	res.set('Content-Type', register.contentType);
	res.end(register.metrics());
});

//Enable collection of default metrics
client.collectDefaultMetrics({ register });

module.exports = router;
