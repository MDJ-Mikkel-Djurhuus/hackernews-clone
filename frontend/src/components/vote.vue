<template>
  <div class="vote" v-if="loggedUser.username && username !== loggedUser.username">
    <img src="/static/arrow-down.svg" v-if="value<=0" id="up" @click="Vote(1)">
    <img src="/static/arrow-down.svg" v-else id="up" style="opacity: 0.5; cursor:default;">
    <div class="spacer" v-if="value!=0" @click="Vote(0)"></div>
    <div class="spacer" v-else style="opacity: 0.5; cursor:default;"></div>
    <img src="/static/arrow-down.svg" v-if="value>=0" id="down" @click="Vote(-1)">
    <img src="/static/arrow-down.svg" v-else id="down" style="opacity: 0.5; cursor:default;">
  </div>
</template>

<script>
import { getVote, insertVote, deleteVote } from "@/api";
export default {
  name: "vote",
  props: ["id", "username"],
  data() {
    return {
      value: 0
    };
  },
  computed: {
    loggedUser() {
      return this.$store.state.loggedUser;
    }
  },
  created() {
    if (this.loggedUser.username) {
      getVote({
        id: this.id,
        username: this.loggedUser.username
      }).then(result => {
        this.value = result ? result.value : 0;
      });
    }
  },
  methods: {
    Vote(value) {
      if (value == 0) {
        deleteVote({
          id: this.id,
          username: this.loggedUser.username
        }).then(result => {
          this.value = 0;
        });
      } else {
        insertVote({
          id: this.id,
          username: this.loggedUser.username,
          value: value
        }).then(result => {
          this.value = value;
        });
      }
    }
  }
};
</script>

<style>
.vote {
  display: flex;
  flex-flow: wrap;
  flex-direction: column;
  float: left;
  margin-left: -23px;
  margin-top: -35px;
  align-items: center;
}
.vote .spacer {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--main-color);
  cursor: pointer;
}
.vote img {
  width: 10px;
  height: 10px;
  cursor: pointer;
}
.vote img#up {
  transform: rotate(180deg);
}
.vote img#down {
}
</style>
