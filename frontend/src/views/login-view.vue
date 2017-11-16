<template>
  <div class="login-view">
      <template v-if="user.username">
        <div class="container">
            <div class="logoff">
            <h1>Log off</h1>
            <input type="button" value="Logoff " @click="logoff">
            </div>
        </div>
      </template>
      <template v-else>
        <div class="container">
            <div class="login">
            <h1>Log in</h1>
            <input type="text" placeholder="Username" v-model="login_username">
            <input type="text" placeholder="Password" v-model="login_password">
            <p class="error">{{login_errorMsg}}</p>
            <input type="button" value="Login" @click="login">
            </div>
        </div>
      <div class="container">
          <div class="create">
            <h1>Create New Account</h1>
            <input type="text" placeholder="Username" v-model="new_username">
            <input type="text" placeholder="Password" v-model="new_password">
            <p class="error">{{new_errorMsg}}</p>
            <input type="button" value="Create" @click="create">
            </div>
        </div>
      </template>
  </div>
</template>

<script>
import * as api from "@/api";
export default {
  name: "login-view",
  computed: {
    user() {
      return this.$store.state.loggedUser;
    }
  },
  data() {
    return {
      new_username: "",
      new_password: "",
      new_errorMsg: "",
      login_username: "",
      login_password: "",
      login_errorMsg: ""
    };
  },
  methods: {
    create() {
      if (this.new_username != "" && this.new_password != "") {
        if (this.new_username != "" && this.new_password != "") {
          api
            .CreateAccount(this.new_username, this.new_password)
            .then(response => {
              this.$store.state.loggedUser = response;
              this.clearValues();
            })
            .catch(err => {
              this.new_errorMsg = err;
            });
        }
      }
    },
    login() {
      if (this.login_username != "" && this.login_password != "") {
        api
          .Login(this.login_username, this.login_password)
          .then(response => {
            this.$store.state.loggedUser = response;
            this.clearValues();
          })
          .catch(err => {
            this.login_errorMsg = err;
          });
      }
    },
    logoff() {
      return (this.$store.state.loggedUser = {});
    },
    clearValues() {
      this.new_username = "";
      this.new_password = "";
      this.new_errorMsg = "";
      this.login_username = "";
      this.login_password = "";
      this.login_errorMsg = "";
    }
  },
  created() {
  }
};
</script>

<style scoped>
.login-view {
  flex-flow: row wrap;
  position: absolute;
  display: flex;
  margin: 30px 0;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  justify-content: space-around;
  color: #ff6600;
}
.container {
  flex: 0 0 90%;
  text-align: center;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px;
  margin-bottom: 20px;
}
.logoff,
.login,
.create {
  position: relative;
  padding: 20px 30px;
}
input[type="button"],
input[type="text"] {
  margin-top: 20px;
}
input[type="button"] {
  background-color: #ff6600;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
}
input[type="text"] {
  width: 90%;
  height: 30px;
  padding: 10px;
}
/* Medium screens */
@media all and (min-width: 600px) {
  /* We tell both sidebars to share a row */
  .container {
    flex: 0 1 45%;
  }
}
</style>
