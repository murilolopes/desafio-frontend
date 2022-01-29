<template>
  <div class="home">
    <featured-videos />
  </div>
</template>

<script>
import FeaturedVideos from "@/components/FeaturedVideos.vue";

export default {
  components: { FeaturedVideos },
  name: "Home",
};
</script>
