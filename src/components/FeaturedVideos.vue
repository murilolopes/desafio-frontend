<template>
  <div class="home">
    <button @click="topVideos()">top videos</button>
    <b-container v-if="videos.length">
      <b-row cols="12">
        <b-col cols="9">
          <b-row>
            <b-col cols="8">
              <video-card
                :title="videos[0].snippet.title"
                :channelName="videos[0].snippet.channelTitle"
                :tags="videos[0].snippet.tags"
                :viewCounter="videos[0].statistics.viewCount"
                :likeCounter="videos[0].statistics.likeCount"
                :commentCounter="videos[0].statistics.commentCount"
                :thumb="videos[0].snippet.thumbnails.maxres.url"
              />
            </b-col>
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
import VideoCard from "@/components/VideoCard.vue";

export default {
  name: "FeaturedVideos",
  components: {
    VideoCard,
  },
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
