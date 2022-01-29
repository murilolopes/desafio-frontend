<template>
  <div class="home">
    <button @click="topVideos()">top videos</button>
  </div>
</template>

<script>
import YoutubeVideo from "@/services/youtube-video.js";

export default {
  name: "Home",
  methods: {
    async topVideos() {
      try {
        const reponse = await new YoutubeVideo.topVideos();
        console.log("response:", reponse);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
