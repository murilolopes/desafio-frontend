<template>
  <b-card
    :title="title"
    :img-src="thumb"
    img-alt="Image"
    align="left"
    title-tag="h5"
    class="mb-3"
  >
    <b-card-text> {{ channelName }}</b-card-text>
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
};
</script>
