<template>
  <b-container fluid v-if="videos.length" class="mt-3">
    <b-card title="Videos" class="mb-3">
      <b-row cols="12">
        <b-col
          sm="12"
          md="4"
          lg="4"
          xl="2"
          v-for="(video, index) in videos"
          :key="index"
        >
          <video-card
            :title="video.title"
            :channelName="video.channelName"
            :thumb="video.thumb"
          />
        </b-col>
      </b-row>
    </b-card>
  </b-container>
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
