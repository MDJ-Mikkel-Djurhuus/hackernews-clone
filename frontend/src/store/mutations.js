import Vue from 'vue'

export default {
    SET_ACTIVE_TYPE: (state, { type }) => {
        state.activeType = type
    },

    SET_LIST: (state, { type, ids }) => {
        state.lists[type] = ids;
    },

    SET_POSTS: (state, { posts }) => {
        posts.forEach(post => {
            if (post) {
                Vue.set(state.posts, post.id, post);
            }
        })
    },

    SET_USER: (state, { username, user }) => {
        Vue.set(state.users, username, user || false); /* false means user not found */
    },

    SET_LOGGED_IN_USER: (state, { user }) => {
        state.user = user;
    },

    SET_CURRENT_POST: (state, { post }) => {
        state.post = post;
    }
}