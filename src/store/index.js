/* eslint-disable no-empty-pattern */
import Vue from "vue";
import Vuex from "vuex";
import YoutubeVideo from "@/services/youtube-video.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchHistory: JSON.parse(sessionStorage.getItem("searchHistory")) || [],
    filteredVideos: [],
    featuredVideos: [],
    featuredVideosByCategory: [],
  },
  mutations: {
    SET_VIDEOS(state, payload) {
      state.filteredVideos = payload;
    },
    SET_FEATURED_VIDEOS(state, payload) {
      state.featuredVideos = payload;
    },
    SET_FEATURED_VIDEOS_BY_CATEGORY(state, payload) {
      state.featuredVideosByCategory.push(payload);
    },
    SET_SEARCH_HISTORY(state, payload) {
      state.searchHistory = payload;
    },
  },
  actions: {
    async searchVideos({ commit }, payload) {
      try {
        const reponse = await new YoutubeVideo.searchVideos(payload);
        this.dispatch("saveQuery", payload);
        commit("SET_VIDEOS", reponse.items, { root: true });
      } catch (error) {
        console.log(error);
      }
    },
    async featuredVideos({ commit }) {
      try {
        const reponse = await new YoutubeVideo.featuredVideos();
        commit("SET_FEATURED_VIDEOS", reponse.items, { root: true });
      } catch (error) {
        console.log(error);
      }
    },
    async featuredVideosByCategory({ commit }, videoCategoryId) {
      try {
        const reponse = await new YoutubeVideo.featuredVideosByCategory(
          videoCategoryId
        );
        commit(
          "SET_FEATURED_VIDEOS_BY_CATEGORY",
          { videoCategoryId, items: reponse.items },
          { root: true }
        );
      } catch (error) {
        console.log(error);
      }
    },
    saveQuery({ commit }, payload) {
      try {
        let currentHistory =
          JSON.parse(sessionStorage.getItem("searchHistory")) || [];
        currentHistory.push({
          term: payload,
          timestamp: new Date().getTime(),
        });

        commit("SET_SEARCH_HISTORY", currentHistory);
        sessionStorage.setItem("searchHistory", JSON.stringify(currentHistory));
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    filteredVideos(state) {
      let videos = [];
      state.filteredVideos.filter((video) => {
        const tags = video.snippet.tags?.length ? video.snippet.tags : [];
        const thumb =
          video.snippet.thumbnails.maxres?.url ||
          video.snippet.thumbnails.default.url;

        videos.push({
          title: video.snippet.title,
          channelName: video.snippet.channelTitle,
          tags,
          thumb,
        });
      });

      return videos;
    },
    filteredFeaturedVideos(state) {
      let videos = [];
      state.featuredVideos.filter((video) => {
        const tags = video.snippet.tags?.length ? video.snippet.tags : [];
        const thumb =
          video.snippet.thumbnails.maxres?.url ||
          video.snippet.thumbnails.default.url;

        videos.push({
          title: video.snippet.title,
          channelName: video.snippet.channelTitle,
          tags,
          thumb,
        });
      });

      return videos;
    },
    filteredFeaturedVideosByCategory(state) {
      let videosByCategory = [];
      state.featuredVideosByCategory.filter((category) => {
        let videos = [];

        category.items.filter((video) => {
          const tags = video.snippet.tags?.length ? video.snippet.tags : [];
          const thumb =
            video.snippet.thumbnails.maxres?.url ||
            video.snippet.thumbnails.default.url;

          videos.push({
            title: video.snippet.title,
            channelName: video.snippet.channelTitle,
            tags,
            thumb,
          });
        });

        videosByCategory.push({
          videoCategoryId: category.videoCategoryId,
          items: videos,
        });
      });

      return videosByCategory;
    },
    formatedSearchHistory(state) {
      let history = [];

      state.searchHistory.filter((item) => {
        history.push({
          term: item.term,
          timestamp: item.timestamp,
          formated_timestamp: new Date(item.timestamp).toLocaleString(),
        });
      });

      return history.sort((a, b) => {
        return b.timestamp - a.timestamp;
      });
    },
  },
});
