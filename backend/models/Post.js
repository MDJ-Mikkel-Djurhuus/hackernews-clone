const path = require("path");
var db = require("../connection");

// var postexmaple = {
//     post_title: "Y Combinator",
//     post_text: "", 
//     hanesst_id: 1,
//     post_type: "story", 
//     post_parent: -1, 
//     username: "pg",  
//     pwd_hash: "Y89KIJ3frM", 
//     post_url: "http://ycombinator.com"
// };

var Post = {
    getAllPosts: function(callback) {
        console.log("getAllPosts")
        return db.query("Select * from post", callback);
    },

    getPostById: function(id, callback) {
        console.log("getPostById", id)
        let query = `SELECT score.val as post_score, parent.*
        FROM (SELECT SUM(value) val, p.hanesst_id
        FROM hackernews.post p
        left join hackernews.vote v
        on p.hanesst_id=v.hanesst_id
        group by hanesst_id) as score
        left join (SELECT group_concat(child.hanesst_id) as post_kids, parent.*
        FROM hackernews.post as parent
        left join hackernews.post as child
        on parent.hanesst_id=child.post_parent
        group by hanesst_id) as parent
        on parent.hanesst_id=score.hanesst_id
        where parent.hanesst_id=?`
        return db.query(query, [id], callback);
    },

    getIdsOfType: function(type, callback) {
        console.log("getIdsOfType", type)
        if (type === "story" || type === "comment") {
            return db.query("select hanesst_id from post where post_type=?", [type], callback);
        } else {
            return db.query("select hanesst_id from post", callback);
        }
    },

    getPostsByUser: function(username, callback) {
        console.log("getPostByUser", username)
        return db.query("select * from post where username=? LIMIT 1", [username], callback);
    },

    getAllStories: function(callback) {
        console.log("getAllStories")
        return db.query("Select * from post where post_type='story'", callback);
    },

    getStoriesByUser: function(username, callback) {
        console.log("getStoriesByUser", username)
        return db.query("Select * from post where post_type='story' AND username=?", [username], callback);
    },

    getAllComments: function(callback) {
        console.log("getAllComments")
        return db.query("Select * from post where post_type='comment'", callback);
    },

    getCommentsByUser: function(username, callback) {
        console.log("getCommentsByUser", username)
        return db.query("Select * from post where post_type='comment' AND username=?", [username], callback);
    },

    getLatest: function(callback) {
        console.log("getLatest")
        return db.query("Select * from post ORDER BY post_time DESC LIMIT 1", callback);
    },

    addPost: function(Post, callback) {
        console.log("addPost")
        return db.query("Insert into post (username,pwd_hash,hanesst_id,post_parent,post_type,post_title,post_url,post_text,post_time) values (?,?,default,?,?,?,?,?,default)", [
                Post.username,
                Post.pwd_hash,
                Post.post_parent,
                Post.post_type,
                Post.post_title,
                Post.post_url,
                Post.post_text
            ],
            callback);
    },

    deletePost: function(id, auth, callback) {
        console.log("deletePost", id, auth)
        return db.query("delete from post where hanesst_id=? AND username=? AND pwd_hash=?", [id, auth.username, auth.pwd_hash], callback);
        // IMPLEMENT DELETION OF CHILD COMMENTS?
    },

    updatePost: function(id, Post, callback) {
        console.log("updatePost", id, Post)
        return db.query("update post set post_title=?,post_text=?,post_url=? hanesst_id=? AND username=? AND pwd_hash=?", [
                Post.post_title,
                Post.post_text,
                Post.post_url,
                id,
                Post.username,
                Post.pwd_hash
            ],
            callback);
    },

    getVote: function({
        username,
        hanesst_id
    }, callback) {
        console.log("getVote", hanesst_id, hanesst_id)
        let query = `SELECT value FROM user user
        left join vote vote
        on user.username=vote.username
        where vote.username=? and vote.hanesst_id=?;`
        return db.query(query, [username, hanesst_id], callback);
    },

    insertVote: function({
        username,
        hanesst_id,
        value
    }, callback) {
        console.log("insertVote", username, hanesst_id, value)
        return db.query("Insert into vote (username,hanesst_id,value,id) values (?,?,?,default)", [username, hanesst_id, value], callback);
    },

    deleteVote: function({
        username,
        hanesst_id
    }, callback) {
        console.log("deleteVote", username, hanesst_id)
        return db.query("DELETE From vote WHERE vote.username=? and vote.hanesst_id=? ", [username, hanesst_id], callback);
    }

};
module.exports = Post;