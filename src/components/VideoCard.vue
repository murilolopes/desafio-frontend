<template>
  <b-card :title="title" :img-src="thumb" img-alt="Image" img-top align="left">
    <b-card-text>
      {{ channelName }}<br />
      <small class="text-muted">
        Tags:
        {{ formatedTags }}
      </small>
    </b-card-text>

    <template #footer>
      <div class="d-flex justify-content-between">
        <div>Views: {{ viewCounter }}</div>
        <div>Likes: {{ likeCounter }}</div>
        <div>Comments: {{ commentCounter }}</div>
      </div>
    </template>
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
    tags: {
      type: Array,
    },
    viewCounter: {
      type: String,
      default: "",
    },
    likeCounter: {
      type: String,
      default: "",
    },
    commentCounter: {
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
      return this.tags.slice(0, 5).join(", ");
    },
  },
};
</script>
