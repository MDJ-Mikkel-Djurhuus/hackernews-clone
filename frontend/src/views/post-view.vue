<template>
  <div class="post-view" v-if="post">
    <div class="post-header">
      <template v-if="post.post_url && post.post_url !== ''">
        <a :href="post.post_url" target="_blank" rel="noopener">
          <h1>{{ post.post_title }}</h1>
        </a>
        <span class="host"> ({{ post.post_url | host }})</span>
      </template>
      <template v-else>
        <h1>{{ post.post_title }}</h1>
      </template>
      <div>
        <vote class="vote" :id="this.$route.params.id" :username="post.username">
        </vote>
        <div class="text" v-html="post.post_text"></div>
      </div>
      <p class="meta">
        {{ post.post_score || 0 }} points | by
        <router-link :to="'/user/' + post.username">{{ post.username }}</router-link>
        {{ post.post_time | timeAgo }} ago
        <router-link :to="'/post/' + post.post_parent" v-if="post.post_parent != -1">parent</router-link>
      </p>
    </div>
    <div class="reply" v-if="loggedUser.username">
      <br>
      <p>Comment:</p>
      <textarea name="" id="" rows="3" v-model="reply"></textarea>
      <input type="button" value="Comment" @click="comment">
    </div>
    <div class="comments">
      <p class="comments-header">{{ post.post_kids !== null ? post.post_kids.split(",").length + ' comments' : 'No comments yet.' }}</p>
      <ul class="comment-children">
        <comment v-for="id in kids" :key="id" :id="id"></comment>
      </ul>
    </div>
  </div>
</template>

<script>
import Comments from "@/components/comment";
import Vote from "@/components/vote";
import * as api from "@/api";
export default {
  name: "post-view",
  components: {
    comment: Comments,
    vote: Vote
  },
  data: () => ({
    loading: true,
    reply: "",
    vote: 0
  }),
  computed: {
    post() {
      return this.$store.state.posts[this.$route.params.id];
    },
    loggedUser() {
      return this.$store.state.loggedUser;
    },
    kids() {
      if (this.post.post_kids !== null) return this.post.post_kids.split(",");
      else {
      }
    }
  },
  // Fetch comments when mounted on the client
  beforeMount() {
    this.fetchComments();
  },
  // refetch comments if post changed
  watch: {
    post: "fetchComments"
  },
  methods: {
    fetchPost(store, id) {
      return store.dispatch("FETCH_POSTS", { ids: [id] }).then(() => {});
    },
    fetchComments() {
      if (!this.post || !this.post.post_kids) {
        return;
      }
      this.loading = true;
      fetchComments(this.$store, this.post).then(() => {
        this.loading = false;
      });
    },
    comment() {
      api.postComment(this.reply, this.post, this.loggedUser).then(response => {
        this.reply = "";
        this.$store
          .dispatch("FETCH_POSTS", {
            ids: [this.$route.params.id],
            force: true
          })
          .then(() => {});
      });
    }
  }
};
// recursively fetch all descendent comments
function fetchComments(store, post) {
  if (post && post.post_kids !== null) {
    return store
      .dispatch("FETCH_POSTS", {
        ids:
          post.post_kids.split(",").length > 0
            ? post.post_kids.split(",")
            : [post.post_kids]
      })
      .then(e => {
        Promise.all(
          post.post_kids.split(",").map(id => {
            return fetchComments(store, store.state.posts[id]);
          })
        );
      });
  }
}
</script>
<style scoped>
.post-header {
  background-color: #fff;
  padding: 1.8em 2em 1em;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
.post-header h1 {
  display: inline;
  font-size: 1.5em;
  margin: 0;
  margin-right: 0.5em;
}
.post-header .text {
  font-size: 0.9em;
  margin: 1em 0;
  overflow-wrap: break-word;
}
.post-header .host,
.post-header .meta,
.post-header .meta a {
  color: #828282;
}
.post-header .meta a {
  text-decoration: underline;
}
.comments,
.reply {
  background-color: #fff;
  margin-top: 10px;
  padding: 0 2em 0.5em;
}

.reply textarea {
  width: 100%;
  margin: auto;
  resize: none;
}
.comments-header {
  margin: 0;
  font-size: 1.1em;
  padding: 1em 0;
  position: relative;
}
.comment-children {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
