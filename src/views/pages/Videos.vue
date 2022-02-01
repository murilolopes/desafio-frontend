<template>
  <div class="home">
    <b-row cols="12">
      <b-col cols="3" v-for="(video, index) in videos" :key="index">
        <video-card
          :title="video.title"
          :channelName="video.channelName"
          :tags="video.tags"
          :thumb="video.thumb"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import VideoCard from "../../components/VideoCard.vue";

export default {
  name: "Videos",
  components: { VideoCard },
  computed: {
    videos() {
      return this.$store.getters.filteredVideos;
    },
  },
};
</script>
