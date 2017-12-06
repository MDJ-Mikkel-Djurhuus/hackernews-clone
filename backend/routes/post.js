var express = require('express');
var router = express.Router();
const path = require("path");
var Post = require("../models/post");
// setInterval(() => {
// 	logger.level = 'debug';
// 	logger.debug("Some debug message");
// }, 2000);

const log4js = require('log4js');
const logger = log4js.getLogger();
log4js.configure({
  appenders: {
    console: { type: "console" },
    logfaces: { type: 'logFaces-HTTP', url: 'http://localhost:9700' }
  },
  categories: {
    default: { appenders: [ 'console', 'logfaces' ], level: 'info' }
  }
});

router.get('/:id?', function (req, res, next) {
    if (req.params.id) {
        Post.getPostById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
            next()
        });
    } else {
        Post.getAllPosts(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
            next()
        });
    }
});
router.get('/ids', function (req, res, next) {

    Post.getIdsOfType(req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
        next()
    });
});

router.put('/', function (req, res, next) {

    Post.addPost(req.body, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
        next()
    });
});

router.post('/', function (req, res, next) {

    Post.addPost(req.body, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
        next()
    });
});

router.delete('/:id', function (req, res, next) {

    Post.deletePost(req.params.id, req.body, function (err, count) {

        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
        next()

    });
});


router.put('/:id', function (req, res, next) {

    Post.updatePost(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
        next()
    });
});
router.get('/comment', function (req, res, next) {

    Post.getAllComments(function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
        next()
    });
});
router.get('/comment/ids', function (req, res, next) {

    Post.getIdsOfType("comment", function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
        next()
    });
});

router.get('/story', function (req, res, next) {

    Post.getAllStories(function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
        next()
    });
});
router.get('/story/ids', function (req, res, next) {

    Post.getIdsOfType("story", function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
        next()
    });
});
module.exports = router;