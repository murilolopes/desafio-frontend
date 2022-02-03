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
    <b-nav-form>
      <div class="g-signin2" data-onsuccess="onSignIn">
        <b-button
          id="signInButton"
          class="my-2 my-sm-0"
          @click="login"
          v-if="!$store.getters.isLoggedIn"
        >
          Login
        </b-button>
        <b-button
          id="signOutButton"
          class="my-2 my-sm-0"
          @click="logout"
          v-if="$store.getters.isLoggedIn"
        >
          Logout
        </b-button>
      </div>
    </b-nav-form>
  </b-navbar>
</template>

<script>
/* eslint-disable no-undef */

export default {
  name: "NavBar",
  data() {
    return {
      search: "",
      errors: null,
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
          this.errors = err;
        });
    },
    async login() {
      try {
        await this.$store.dispatch("login");
      } catch (error) {
        this.errors = error;
      }
    },
    async logout() {
      try {
        await this.$store.dispatch("logout");
      } catch (error) {
        this.errors = error;
      }
    },
  },
};
</script>
