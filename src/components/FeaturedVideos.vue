<template>
  <b-container fluid v-if="videos.length">
    <h4>Feature videos</h4>
    <b-row cols="12">
      <b-col cols="8" class="bg-primary">
        <b-row>
          <b-col cols="8">
            <video-card
              :title="videos[0].title"
              :channelName="videos[0].channelName"
              :tags="videos[0].tags"
              :thumb="videos[0].thumb"
            />
          </b-col>
          <b-col cols="4" class="bg-secondary">
            <video-card
              :title="videos[1].title"
              :channelName="videos[1].channelName"
              :tags="videos[1].tags"
              :thumb="videos[1].thumb"
            />
            <video-card
              :title="videos[2].title"
              :channelName="videos[2].channelName"
              :tags="videos[2].tags"
              :thumb="videos[2].thumb"
            />
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="4" class="bg-success">
        <video-card
          :title="videos[3].title"
          :channelName="videos[3].channelName"
          :tags="videos[3].tags"
          :thumb="videos[3].thumb"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VideoCard from "@/components/VideoCard.vue";

export default {
  name: "FeaturedVideos",
  components: {
    VideoCard,
  },
  computed: {
    videos() {
      return this.$store.getters.filteredTopVideos;
    },
  },
};
</script>
