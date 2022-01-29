<template>
  <div id="app">
    <ByCodersNavBar />
    <router-view />
  </div>
</template>

<script>
/* eslint-disable no-undef */
const start = () =>
  gapi.client
    .init({
      apiKey: process.env.VUE_APP_YOUTUBE_API_KEY,
      clientId:
        "478919921389-bjklcfraja7ai0hs12ke68pu6teofgdp.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/youtube",
    })
    .then(() => {
      gapi.client.load("youtube", "v3");
    });

gapi.load("client", start);

import ByCodersNavBar from "@/components/ByCodersNavBar.vue";

export default {
  name: "App",
  components: {
    ByCodersNavBar,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
