<template>
  <div class="home">
    <button @click="topVideos()">top videos</button>
    <b-container v-if="videos.length">
      <b-row cols="12">
        <b-col cols="9">
          <b-row>
            <b-col cols="8">
              <b-card
                :title="videos[0].snippet.title"
                :img-src="videos[0].snippet.thumbnails.maxres.url"
                img-alt="Image"
                img-top
                align="left"
              >
                <b-card-text>
                  {{ videos[0].snippet.channelTitle }}<br />
                  <small class="text-muted">
                    Tags:
                    {{ videos[0].snippet.tags.slice(0, 4).join(",") }}
                  </small>
                </b-card-text>

                <template #footer>
                  <div class="d-flex justify-content-between">
                    <div>Views: {{ videos[0].statistics.viewCount }}</div>
                    <div>Likes: {{ videos[0].statistics.likeCount }}</div>
                    <div>Comments: {{ videos[0].statistics.commentCount }}</div>
                  </div>
                </template>
              </b-card>
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
