const HOST = "http://backend:8081"; // name of docker service
const header = {
    Accept: "application/json",
    "Content-Type": "application/json"
};

export function fetchPost(id) {
    return new Promise((resolve, reject) => {
        fetch(HOST + "/post/" + id, {
            method: "get",
            headers: header
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            if (json.length > 0) {
                resolve(json[0]);
            } else {
                reject("Post not found");
            }
        }).catch((err) => {
            reject(err);
        })
    })
}

export function insertVote({ username, hanesst_id, value }) {
    return new Promise((resolve, reject) => {
        fetch(HOST + "/vote", {
            method: "put",
            headers: header,
            body: JSON.stringify({
                username: username,
                hanesst_id: hanesst_id,
                value: value
            })
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            resolve(json);
        }).catch((err) => {
            reject(err);
        })
    })
}
export function deleteVote({ username, hanesst_id }) {
    return new Promise((resolve, reject) => {
        fetch(HOST + "/vote", {
            method: "delete",
            headers: header,
            body: JSON.stringify({
                username: username,
                hanesst_id: hanesst_id
            })
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            resolve(json);
        }).catch((err) => {
            reject(err);
        })
    })
}

export function getVote({ username, hanesst_id }) {
    return new Promise((resolve, reject) => {
        fetch(HOST + "/vote", {
            method: "post",
            headers: header,
            body: JSON.stringify({
                username: username,
                hanesst_id: hanesst_id
            })
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            resolve(json[0]);
        }).catch((err) => {
            reject(err);
        })
    })
}

export function fetchPosts(ids) {
    return Promise.all(ids.map(id => fetchPost(parseInt(id))))
}
export function fetchAllPosts(type) {
    if (type !== "comments" && type !== "stories") {
        type = "";
    }
    return new Promise((resolve, reject) => {
        fetch(HOST + `/post/${type}`, {
            method: "get",
            headers: header
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            if (json.length > 0) {
                resolve(json[0]);
            } else {
                reject("no posts");
            }
        }).catch((err) => {
            reject(err);
        })
    })
}

export function fetchIdsOfType(type) {
    if (type !== "story" && type !== "comment") {
        type = "";
    }
    return new Promise((resolve, reject) => {
        fetch(HOST + `/post${"/"+type}/ids`, {
            method: "get",
            headers: header
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            if (json.length > 0) {
                resolve(json.map(x => x.hanesst_id));
            } else {
                reject("no posts");
            }
        }).catch((err) => {
            reject(err);
        })
    })
}

export function fetchPostsByUser(username, type) {
    return new Promise((resolve, reject) => {
        fetch(HOST + `/user/${username}/${type}`, {
            method: "get",
            headers: header
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            if (json.length > 0) {
                resolve(json[0]);
            } else {
                reject("type not found");
            }
        }).catch((err) => {
            reject(err);
        })
    })
}
export function fetchUserScore(username) {
    return new Promise((resolve, reject) => {
        fetch(HOST + `/user/${username}/score`, {
            method: "get",
            headers: header
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            resolve(json);
        }).catch((err) => {
            reject(err);
        })
    })
}

export function fetchUser(id) {
    return new Promise((resolve, reject) => {
        fetch(HOST + "/user/" + id, {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            if (json.length > 0) {
                resolve(json[0]);
            } else {
                reject("User not found");
            }
        }).catch((err) => {
            reject(err);
        })
    })
}
export function postComment(text, parent, user) {
    return new Promise((resolve, reject) => {
        fetch(HOST + "/post", {
            method: "put",
            headers: header,
            body: JSON.stringify({
                "pwd_hash": user.pwd_hash,
                "username": user.username,
                "post_parent": parent.hanesst_id,
                "post_type": "comment",
                "post_title": "Comment on: " + parent.post_title,
                "post_text": text
            })
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            resolve(json);
        }).catch((err) => {
            reject(err);
        })
    })
}
export function postStory({ title, text, url, user }) {
    return new Promise((resolve, reject) => {
        fetch(HOST + "/post", {
            method: "put",
            headers: header,
            body: JSON.stringify({
                "pwd_hash": user.pwd_hash,
                "username": user.username,
                "post_parent": -1,
                "post_type": "story",
                "post_title": title,
                "post_url": url,
                "post_text": text
            })
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            resolve(json);
        }).catch((err) => {
            reject(err);
        })
    })
}

export function Login(username, pwd) {
    return new Promise((resolve, reject) => {
        fetch(HOST + "/login", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                pwd_hash: pwd
            })
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            if (json.length > 0) {
                resolve(json[0]);
            } else {
                reject("User not found");
            }
        }).catch((err) => {
            reject(err);
        })
    })
}

export function CreateAccount(username, pwd) {
    return new Promise((resolve, reject) => {
        fetch(HOST + "/user", {
            method: "put",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                pwd_hash: pwd
            })
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            if (json.username) {
                resolve(json);
            } else {
                if (json.code === "ER_DUP_ENTRY") {
                    reject("username already exists");
                }
            }
        }).catch((err) => {
            reject(err);
        })
    })
}