import Vue from "vue";
import Vuex from "vuex";
import YoutubeVideo from "@/services/youtube-video.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filteredVideos: [],
    topVideos: [],
    featuredVideosByCategory: [],
  },
  mutations: {
    SET_VIDEOS(state, payload) {
      state.filteredVideos = payload;
    },
    SET_TOP_VIDEOS(state, payload) {
      state.topVideos = payload;
    },
    SET_FEATURED_VIDEOS_BY_CATEGORY(state, payload) {
      state.featuredVideosByCategory.push(payload);
    },
  },
  actions: {
    async searchVideos({ commit }, payload) {
      try {
        const reponse = await new YoutubeVideo.searchVideos(payload);
        commit("SET_VIDEOS", reponse.items, { root: true });
      } catch (error) {
        console.log(error);
      }
    },
    async topVideos({ commit }) {
      try {
        const reponse = await new YoutubeVideo.topVideos();
        commit("SET_TOP_VIDEOS", reponse.items, { root: true });
      } catch (error) {
        console.log(error);
      }
    },
    async featuredVideosByCategory({ commit }, videoCategoryId) {
      try {
        const reponse = await new YoutubeVideo.topVideosByCategory(
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
    filteredTopVideos(state) {
      let videos = [];
      state.topVideos.filter((video) => {
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
  },
});
