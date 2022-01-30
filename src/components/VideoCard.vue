<template>
  <b-card
    :title="title"
    :img-src="thumb"
    img-alt="Image"
    align="left"
    footer-bg-variant="white"
  >
    <b-card-text> {{ channelName }}<br /> </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "VideoCard",
  props: {
    title: {
      type: String,
      default: "",
    },
    channelName: {
      type: String,
      default: "",
    },
    thumb: {
      type: String,
      default: "",
    },
  },
  computed: {
    formatedTags() {
      if (!this.tags.length) return "";

      return this.tags.slice(0, 5).join(", ");
    },
  },
};
</script>
