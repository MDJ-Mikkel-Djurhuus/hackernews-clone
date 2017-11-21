var express = require('express');
var router = express.Router();
const path = require("path");
var Post = require("../models/post");
var User = require("../models/user");


router.get('/latest', function(req, res, next) {
    Post.getLatest(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows[0].hanesst_id);
        }
        next()

    });
});
router.get('/status', function(req, res, next) {
    res.json("UP");
});

router.post('/login', function(req, res, next) {
    User.login(req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
        next()

    });
});

router.put('/vote', function(req, res, next) {

    Post.insertVote(req.body, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
        next()

    });
});

router.delete('/vote', function(req, res, next) {

    Post.deleteVote(req.body, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
        next()

    });
});

router.post('/vote', function(req, res, next) {

    Post.getVote(req.body, function(err, result) {

        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
        next()

    });
});
module.exports = router;