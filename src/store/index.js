import Vue from "vue";
import Vuex from "vuex";
import YoutubeVideo from "@/services/youtube-video.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filteredVideos: [],
    topVideos: [],
  },
  mutations: {
    SET_VIDEOS(state, payload) {
      state.filteredVideos = payload;
    },
    SET_TOP_VIDEOS(state, payload) {
      state.topVideos = payload;
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
  },
});
