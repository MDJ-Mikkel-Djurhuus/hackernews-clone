<template>
  <li class="post">
    <span class="score">{{ post.post_score || 0 }}</span>
    <span class="title">
      <template v-if="post.post_url && post.post_url !== ''">
        <a :href="post.post_url" target="_blank" rel="noopener">{{ post.post_title }}</a>
        <span class="host"> ({{ post.post_url | host }})</span>
      </template>
      <template v-else>
        <router-link :to="'/post/' + post.hanesst_id">{{ post.post_title }}</router-link>
      </template>
    </span>
    <br>
    <span class="meta">
      <span class="by">
        by <router-link :to="'/user/' + post.username">{{ post.username }}</router-link>
      </span>
      <span class="time">
        {{ post.post_time | timeAgo }} ago
      </span>
      <span class="comments-link">
        | <router-link :to="'/post/' + post.hanesst_id">{{ post.post_kids !== null ? post.post_kids.split(",").length : 0 }} comments</router-link>
      </span>
    </span>
  </li>
</template>

<script>
import { timeAgo } from "../util/filters";
export default {
  name: "post",
  props: ["post"]
};
</script>

<style scoped>
.post {
  background-color: #fff;
  padding: 20px 30px 20px 80px;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px;
}
.post .score {
  color: #f60;
  font-size: 1.1em;
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 0;
  width: 80px;
  text-align: center;
  margin-top: -10px;
}
.post .host,
.post .meta {
  font-size: 0.85em;
  color: #828282;
}
</style>