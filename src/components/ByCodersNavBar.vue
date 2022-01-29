<template>
  <b-navbar toggleable type="dark" variant="dark">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-nav-form>
      <b-form-input class="mr-sm-2" placeholder="Search" v-model="search" />
      <b-button
        variant="outline-success"
        class="my-2 my-sm-0"
        type="submit"
        @click="searchVideos()"
        :disabled="!search"
      >
        Search
      </b-button>
    </b-nav-form>
  </b-navbar>
</template>

<script>
import YoutubeVideo from "@/services/youtube-video.js";

export default {
  name: "NavBar",
  data() {
    return {
      search: "",
    };
  },
  methods: {
    async searchVideos() {
      try {
        const reponse = await new YoutubeVideo.searchVideos(this.search);
        console.log("response:", reponse);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
