<template>
  <div class="home">
    <featured-videos />
    <featured-videos-by-category videoCategoryId="10" />
    <featured-videos-by-category videoCategoryId="20" />
  </div>
</template>

<script>
import FeaturedVideos from "@/components/FeaturedVideos.vue";
import FeaturedVideosByCategory from "../../components/FeaturedVideosByCategory.vue";

export default {
  components: { FeaturedVideos, FeaturedVideosByCategory },
  name: "Home",
};
</script>
