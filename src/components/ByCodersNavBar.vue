<template>
  <b-navbar toggleable type="dark" variant="dark">
    <b-navbar-brand to="/">NavBar</b-navbar-brand>

    <b-nav-form>
      <b-form-input class="mr-sm-2" placeholder="Search" v-model="search" />
      <b-button
        id="navBarSearchButton"
        variant="outline-success"
        class="my-2 my-sm-0"
        type="submit"
        @click="searchVideos()"
        :disabled="!search"
      >
        Search
      </b-button>
    </b-nav-form>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      search: "",
    };
  },
  methods: {
    searchVideos() {
      this.$store
        .dispatch("searchVideos", this.search)
        .then(() => {
          this.$router.push({ name: "Videos" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
