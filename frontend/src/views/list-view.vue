<template>
  <div class="list-view">
    <div class="nav">
      <div class="nav-wrapper">
      <router-link v-if="page > 1" :to="'/list/' + (page - 1)">&lt; prev</router-link>
      <a v-else class="disabled"></a>
      <span>{{ page }}/{{ maxPage }}</span>
      <router-link v-if="hasMore" :to="'/list/' + (page + 1)">more &gt;</router-link>
      <a v-else class="disabled"></a>
      </div>
    </div>
    <div class="list" :key="displayedView" v-if="displayedView > 0">
      <ul>
        <post v-for="post in displayedPosts" :post="post" :key="post.id">
        </post>
      </ul>
    </div>
  </div>
</template>

<script>
import Post from "@/components/post";
export default {
  name: "list-view",
  components: {
    post: Post
  },
  data() {
    return {
      displayedView: Number(this.$route.params.view) || 1,
      displayedPosts: this.$store.getters.activeItems,
      type: "story",
      sort: "post_time"
    };
  },
  computed: {
    page() {
      return Number(this.$route.params.page) || 1;
    },
    maxPage() {
      const { postsPerPage, lists } = this.$store.state;
      return lists[this.type].length
        ? Math.ceil(lists[this.type].length / postsPerPage)
        : 1;
    },
    hasMore() {
      return this.page < this.maxPage;
    }
  },
  methods: {
    loadPosts(to, from) {
      this.$store
        .dispatch("FETCH_LIST_DATA", {
          type: "story",
          orderby: this.sort
        })
        .then(() => {
          this.displayedPosts = this.$store.getters.activePosts;
          if (this.page < 0 || this.page > this.maxPage) {
            this.$router.replace(`/list/1`);
            return;
          }
          this.displayedView = to;
          this.displayedPosts = this.$store.getters.activePosts;
        });
    }
  },
  beforeMount() {
    this.loadPosts(this.page);
  },
  watch: {
    page(to, from) {
      this.loadPosts(to, from);
    }
  }
};
</script>

<style scoped>
.nav {
  z-index: 1;
  font-size: larger;
  font-weight: 700;
  background: white;
  color: var(--main-color);
  height: 50px;
  width: 100%;
  left: 0;
  position: fixed;
}
.nav-wrapper {
  height: 100%;
  width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
}
.nav a {
  color: var(--main-color);
}
.filter {
  display: flex;
  background-color: #fff;
  margin-top: 10px;
  margin-bottom: -10px;
  padding: 0.5em 2em 0.7em;
  justify-content: space-around;
  align-items: center;
}
.filter a {
  text-align: center;
  letter-spacing: 0.1em;
  font-variant: all-petite-caps;
  font-weight: 500;
  color: var(--main-color);
}
.list {
  position: absolute;
  margin: 65px 0;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
