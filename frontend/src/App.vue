<template>
  <div id="app">
    <header class="header">
      <nav class="nav">
        <router-link to="/list">List</router-link>
        <template v-if="loggedUser.username">
        <router-link to="/new">Submit</router-link>
        <router-link :to="'/user/' + loggedUser.username">Profil</router-link>
        <router-link to="/login">Log off</router-link>
        </template>
        <router-link v-else  to="/login">Log in</router-link>
      </nav>
    </header>
    <div class="content">
    <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  computed: {
    loggedUser() {
      return this.$store.state.loggedUser;
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
}
a,
body {
  color: #34495e;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 15px;
  background-color: #f2f3f5;
  margin: 0;
  padding-top: 55px;
  /* overflow-y: scroll; */
}
.header {
  background-color: #f60;
  position: fixed;
  z-index: 999;
  height: 55px;
  top: 0;
  left: 0;
  right: 0;
}
.header .nav {
  max-width: 800px;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 15px 5px;
}
.header a {
  color: hsla(0, 0%, 100%, 0.8);
  line-height: 24px;
  transition: color 0.15s ease;
  display: inline-block;
  vertical-align: middle;
  font-weight: 300;
  letter-spacing: 0.075em;
  margin-right: 1.8em;
}
.header a.router-link-active {
  color: #fff;
  font-weight: 400;
}
.content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}
</style>
