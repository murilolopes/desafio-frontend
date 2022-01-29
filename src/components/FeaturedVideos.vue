<template>
  <div class="home">
    <button @click="topVideos()">top videos</button>
    <b-container v-if="videos.length">
      <b-row cols="12">
        <b-col cols="9">
          <b-row>
            <b-col cols="8"> </b-col>
            <b-col cols="4"></b-col>
          </b-row>
        </b-col>
        <b-col cols="3"> 3</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import YoutubeVideo from "@/services/youtube-video.js";

export default {
  name: "FeaturedVideos",
  data() {
    return {
      videos: [],
    };
  },
  methods: {
    async topVideos() {
      try {
        const { items } = await new YoutubeVideo.topVideos();
        this.$set(this, "videos", items);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
