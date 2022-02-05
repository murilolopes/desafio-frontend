<template>
  <b-container fluid v-if="videos.length">
    <b-card title="Featured videos by category" class="mb-3">
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
import VideoCard from "@/components/VideoCard.vue";

export default {
  name: "FeaturedVideosByCategory",
  props: {
    videoCategoryId: {
      type: String,
      required: true,
    },
  },
  components: {
    VideoCard,
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch("featuredVideosByCategory", this.videoCategoryId);
    }, 3000);
  },
  computed: {
    videos() {
      let videos = [];

      this.$store.getters.filteredFeaturedVideosByCategory.filter((video) => {
        if (video.videoCategoryId == this.videoCategoryId)
          videos.push(...video.items);
      });

      return videos;
    },
  },
};
</script>
