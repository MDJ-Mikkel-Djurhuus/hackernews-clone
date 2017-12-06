export default {
    // ids of the items that should be currently displayed based on
    // current list type and current pagination
    activeIds(state) {
        const { activeType, postsPerPage, lists } = state

        if (!activeType) {
            return [];
        }
        const page = Number(state.route.params.page) || 1
        const start = (page - 1) * postsPerPage
        const end = page * postsPerPage
        return lists[activeType].slice(start, end)
    },

    nextIds(state) {
        const { activeType, postsPerPage, lists } = state

        if (!activeType) {
            return [];
        }
        const page = Number( parseInt(state.route.params.page) + 1) || 1
        const start = (page - 1) * postsPerPage
        const end = page * postsPerPage
        return lists[activeType].slice(start, end)
    },
    prevIds(state) {
        const { activeType, postsPerPage, lists } = state

        if (!activeType) {
            return [];
        }
        const page = Number(parseInt(state.route.params.page) -  1) || 1
        const start = (page - 1) * postsPerPage
        const end = page * postsPerPage
        return lists[activeType].slice(start, end)
    },

    // items that should be currently displayed.
    // this Array may not be fully fetched.
    activePosts(state, getters) {
        return getters.activeIds.map(id => state.posts[id]).filter(_ => _)
    }
}