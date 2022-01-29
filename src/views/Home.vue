<template>
  <div class="home">
    search videos: <input v-model="input" type="text" />
    <button @click="getVideos()" :disabled="!input">search videos</button>
    <button @click="topVideos()">top videos</button>
  </div>
</template>

<script>
import YoutubeVideo from "@/services/youtube-video.js";

export default {
  name: "Home",
  data() {
    return {
      input: "",
    };
  },
  methods: {
    async getVideos() {
      try {
        const reponse = await new YoutubeVideo.searchVideos("vayne");
        console.log("response:", reponse);
      } catch (error) {
        console.log(error);
      }
    },
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
