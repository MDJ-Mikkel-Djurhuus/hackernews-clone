import {
    fetchUser,
    fetchPosts,
    fetchIdsOfType
} from '../api'

export default {
    // ensure data for rendering given list type
    FETCH_LIST_DATA: ({ commit, dispatch, state }, { type, orderby }) => {
        commit('SET_ACTIVE_TYPE', { type })
        return fetchIdsOfType({ type, orderby })
            .then(ids => commit('SET_LIST', { type, ids }))
            .then(() => dispatch('ENSURE_ACTIVE_POSTS'))
    },

    // ensure all active posts are fetched
    ENSURE_ACTIVE_POSTS: ({ dispatch, getters }) => {
        dispatch('PRE_FETCH_POSTS');
        return dispatch('FETCH_POSTS', { ids: getters.activeIds })
    },
    // ensure all active posts are fetched
    PRE_FETCH_POSTS: ({ dispatch, getters }) => {
        dispatch('FETCH_POSTS', { ids: getters.prevIds })
        dispatch('FETCH_POSTS', { ids: getters.nextIds })
    },

    FETCH_POSTS: ({ commit, state }, { ids, force }) => {
        // on the client, the store itself serves as a cache.
        // only fetch posts that we do not already have, or has expired (3 minutes)
        const now = Date.now()
        ids = ids.filter(id => {
            const post = state.posts[id]
            if (!post) {
                return true
            }
            if ((now - post.post_time > 1000 * 60 * 3) || force === true) {
                return true
            }
            return false
        })
        if (ids.length) {
            return fetchPosts(ids).then(posts => commit('SET_POSTS', { posts }))
        } else {
            return Promise.resolve()
        }
    },

    FETCH_USER: ({ commit, state }, { username }) => {
        return state.users[username]
            ? Promise.resolve(state.users[username])
            : fetchUser(username).then(user => {
                commit('SET_USER', { username, user })
            })
    }
}