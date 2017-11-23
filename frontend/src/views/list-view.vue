<template>
  <div class="list-view">
    <div class="filter">
      <a @click="sort = 'top'">highest score</a>
      <a @click="sort = 'new'">newest</a>
      <a @click="sort = 'comments'">most commented</a>
    </div>
    <div class="list" :key="displayedView" v-if="displayedView > 0">
      <ul>
        <post v-for="post in this[this.sort]" :post="post" :key="post.id">
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
  props: {
    type: String
  },
  data() {
    return {
      displayedView: Number(this.$route.params.view) || 1,
      displayedPosts: [],
      sort: "top"
    };
  },
  computed: {
    top() {
      return this.displayedPosts.sort((a, b) => {
        if (a.post_score < b.post_score) return 1;
        if (a.post_score > b.post_score) return -1;
        return 0;
      });
    },
    new() {
      return this.displayedPosts.sort((a, b) => {
        if (a.post_time < b.post_time) return 1;
        if (a.post_time > b.post_time) return -1;
        return 0;
      });
    },
    comments() {
      return this.displayedPosts.sort((a, b) => {
        if (a.post_kids === null && b.post_kids === null)return 0;
        if (a.post_kids === null) return 1;
        if (b.post_kids === null) return -1;
        let kids1 = a.post_kids.split(",").length;
        let kids2 = b.post_kids.split(",").length;
        if (kids1 < kids2) return 1;
        if (kids1 > kids2) return -1;
        return 0;
      });
    }
  },
  methods: {
    loadPosts() {
      this.$store
        .dispatch("FETCH_LIST_DATA", {
          type: "story"
        })
        .then(() => {
          this.displayedPosts = this.$store.getters.activePosts;
          // if (this.view < 0 || this.view > this.maxView) {
          //   this.$router.replace(`/${this.type}/1`);
          //   return;
          // }
          // this.transition =
          //   from === -1 ? null : to > from ? "slide-left" : "slide-right";
          // this.displayedView = to;
          // this.displayedPosts = this.$store.getters.activePosts;
          // this.$bar.finish();
        });
    }
  },
  beforeMount() {
    if (this.$root._isMounted) {
      this.loadPosts();
    } else {
      this.loadPosts();
    }

    // watch the current list for realtime updates
    // this.unwatchList = watchList(this.type, ids => {
    //   this.$store.commit("SET_LIST", { type: this.type, ids });
    //   this.$store.dispatch("ENSURE_ACTIVE_ITEMS").then(() => {
    //     this.displayedPosts = this.$store.getters.activePosts;
    //   });
    // });
  }
};
</script>

<style scoped>
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
  margin: 30px 0;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
