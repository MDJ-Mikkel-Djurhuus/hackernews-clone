var express = require('express');
var router = express.Router();
const path = require("path");
var User = require(path.join(__dirname, "..", "models", "user"));
var Post = require(path.join(__dirname, "..", "models", "post"));

router.get('/:username?', function(req, res, next) {

    if (req.params.username) {

        User.getUserById(req.params.username, function(err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {

        User.getAllUsers(function(err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }

        });
    }
});


router.get('/:username/score', function(req, res, next) {
    User.getUserScore(req.params.username, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

router.get('/:username/posts', function(req, res, next) {
    Post.getPostsByUser(req.params.username, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});


router.get('/:username/comments', function(req, res, next) {
    if (req.params.username) {
        Post.getCommentsByUser(req.params.username, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

router.get('/:username/stories', function(req, res, next) {
    if (req.params.username) {
        Post.getStoriesByUser(req.params.username, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});


router.post('/', function(req, res, next) {

    User.addUser(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.put('/', function(req, res, next) {

    User.addUser(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.delete('/:id', function(req, res, next) {

    User.deleteUser(req.params.id, req.body, function(err, count) {

        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }

    });
});

router.put('/:id', function(req, res, next) {

    User.updateUser(req.params.id, req.body, function(err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
module.exports = router;