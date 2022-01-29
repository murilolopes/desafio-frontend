<template>
  <div class="home">
    <featured-videos />
    <popular-videos />
  </div>
</template>

<script>
import FeaturedVideos from "@/components/FeaturedVideos.vue";
import PopularVideos from "@/components/PopularVideos.vue";

export default {
  components: { FeaturedVideos, PopularVideos },
  name: "Home",
};
</script>
