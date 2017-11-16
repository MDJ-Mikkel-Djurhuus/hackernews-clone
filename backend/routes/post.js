var express = require('express');
var router = express.Router();
const path = require("path");
var Post = require("../models/post");

router.get('/:id?', function (req, res, next) {
    if (req.params.id) {
        Post.getPostById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        Post.getAllPosts(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});
router.get('/ids', function (req, res, next) {

    Post.getIdsOfType("", function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.put('/', function (req, res, next) {

    Post.addPost(req.body, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

router.post('/', function (req, res, next) {

    Post.addPost(req.body, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

router.delete('/:id', function (req, res, next) {

    Post.deletePost(req.params.id, req.body, function (err, count) {

        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }

    });
});


router.put('/:id', function (req, res, next) {

    Post.updatePost(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
router.get('/comment', function (req, res, next) {

    Post.getAllComments(function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
router.get('/comment/ids', function (req, res, next) {

    Post.getIdsOfType("comment", function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/story', function (req, res, next) {

    Post.getAllStories(function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
router.get('/story/ids', function (req, res, next) {

    Post.getIdsOfType("story", function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
module.exports = router;