<template>
  <b-container fluid v-if="videos.length">
    <h4>Featured videos by category</h4>
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
