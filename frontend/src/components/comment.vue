<template>
  <li v-if="comment" class="comment">
    <div class="by">
      <span>{{comment.post_score || 0}} point</span>
      <router-link :to="'/user/' + comment.username">by {{ comment.username }}</router-link>
      <router-link :to="'/post/' + id">{{ comment.post_time | timeAgo }} ago reply</router-link>
    </div>
    <div>
      <vote class="vote" :id="id" :username="comment.username" >
      </vote>
      <div class="text" v-html="comment.post_text">
      </div>
    </div>
    <div class="toggle" :class="{ open }" v-if="kids">
      <a @click="open = !open">{{ open ? '[-]' : '[+] ' + pluralize(kids.length) + ' collapsed' }}
      </a>
    </div>
    <ul class="comment-children" v-show="open">
      <comment v-for="id in kids" :key="id" :id="id"></comment>
    </ul>
  </li>
</template>

<script>
import { getVote, insertVote } from "@/api";
import Vote from "@/components/vote"
export default {
  components:{
    "vote":Vote
  },
  name: "comment",
  props: ["id"],
  data() {
    return {
      open: true
    };
  },
  computed: {
    comment() {
      return this.$store.state.posts[parseInt(this.id)];
    },
    kids() {
      if (this.comment.post_kids !== null)
        return this.comment.post_kids.split(",");
      else {
      }
    },
    loggedUser() {
      return this.$store.state.loggedUser;
    }
  },
  methods: {
    pluralize: n => n + (n === 1 ? " reply" : " replies")
  }
};
</script>

<style>
.comment {
  border-top: 1px solid #eee;
  position: relative;
}
.comment .by,
.comment .text,
.comment .toggle {
  font-size: 0.9em;
  margin: 1em 0;
}
.comment .by {
  color: #828282;
}
.comment .by a {
  color: #828282;
  text-decoration: underline;
}
.comment .text {
  overflow-wrap: break-word;
}
.comment .toggle {
  background-color: #fffbf2;
  padding: 0.3em 0.5em;
  border-radius: 4px;
}
.comment .toggle.open {
  padding: 0;
  background-color: transparent;
  margin-bottom: -0.5em;
}
.comment-children .comment-children {
  margin-left: 1.5em;
}
.comment-children {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
