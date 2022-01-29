<template>
  <div class="home">
    <button @click="getVideos()">teste</button>
  </div>
</template>

<script>
import YoutubeVideo from "@/services/youtube-video.js";

export default {
  name: "Home",
  methods: {
    async getVideos() {
      try {
        const reponse = await new YoutubeVideo.fetchVideos("vayne");
        console.log("response:", reponse);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
