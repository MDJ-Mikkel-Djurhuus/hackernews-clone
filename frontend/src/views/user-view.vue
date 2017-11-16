<template>
  <div class="user-view">
    <div v-if="user" class="user">
      <h1>User : {{user.username}}</h1>
      <ul class="meta">
        <li>
          <span class="label">Created: </span>{{ user.time | timeAgo }} ago
        </li>
        <li>
          <span class="label">Score: </span>{{ score }}
        </li>
        <li v-if="user.about" v-html="user.about" class="about"></li>
      </ul>
    </div>
    <div v-else>
      <h1>User not found.</h1>
    </div>
  </div>
</template>

<script>
import * as api from "@/api";
export default {
  name: "user-view",
  components: {},
  data(){
    return {
      score: 0
    }
  },
  computed: {
    user() {
      return this.$store.state.users[this.$route.params.username];
    },
    loggedUser() {
      return this.$store.state.loggedUser;
    },
    loggedin(){
      return this.user.username === this.loggedUser.username;
    }
  },
  beforeMount(){
    api.fetchUserScore(this.$route.params.username).then(result=>{
      if(result.length > 0){
        this.score = result[0].score;
      }
    });
    return this.$store.dispatch("FETCH_USER", { username: this.$route.params.username });
  }
};
</script>

<style>
.user {
  background-color: #fff;
  box-sizing: border-box;
  padding: 2em 3em;
}
</style>
