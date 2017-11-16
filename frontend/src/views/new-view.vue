<template>
  <div class="new-view" v-if="loggedUser.username">
    <h1>Post a new story</h1>
    <p>Title:</p>
    <input type="text" v-model="title" id="title">
    <p>Url:</p>
    <input type="text" v-model="url" id="url">
    <p>Text:</p>
    <textarea name="" id="text" v-model="text" rows="10"></textarea>
    <input type="button" value="Post" id="submit" @click="Submit">
  </div>
</template>

<script>
import * as api from "@/api";
export default {
  name: "post-view",
  components: {},
  data: () => ({
    text: "",
    title: "",
    url: ""
  }),
  computed: {
    loggedUser() {
      return this.$store.state.loggedUser;
    }
  },
  methods: {
    Submit() {
      if (this.title !== "") {
        api
          .postStory({
            text: this.text,
            title: this.title,
            url: this.url,
            user: this.loggedUser
          })
          .then(result => {
            this.Reset();
          });
      }
    },
    Reset() {
      this.text = "";
      this.title = "";
      this.url = "";
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.new-view {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  background-color: #fff;
  box-sizing: border-box;
  padding: 2em 3em;
}
input[type="button"],
input[type="text"],
textarea {
  margin-bottom: 20px;
  flex: 100%;
}
input[type="button"] {
  background-color: #ff6600;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
}
input[type="text"] {
  height: 30px;
  padding: 10px;
}
</style>
