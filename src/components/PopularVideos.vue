<template>
  <b-container v-if="videos.length">
    <h4>Popular videos</h4>
    <b-row cols="12">
      <b-col
        cols="3"
        class="bg-success"
        v-for="(video, index) in videos"
        :key="index"
      >
        <video-card
          :title="video.title"
          :channelName="video.channelName"
          :tags="video.tags"
          :viewCounter="video.viewCounter"
          :likeCounter="video.likeCounter"
          :commentCounter="video.commentCounter"
          :thumb="video.thumb"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VideoCard from "@/components/VideoCard.vue";

export default {
  name: "PopularVideos",
  components: {
    VideoCard,
  },
  computed: {
    videos() {
      return this.$store.getters.filteredVideos;
    },
  },
};
</script>
