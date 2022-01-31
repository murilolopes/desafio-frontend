<template>
  <div id="app">
    <by-coders-nav-bar />
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
      window.youtubeLoaded = true;
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
