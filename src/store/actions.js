import YoutubeVideo from "@/services/youtube-video.js";

export default {
  async searchVideos({ commit, dispatch }, payload) {
    try {
      const reponse = await new YoutubeVideo.searchVideos(payload);
      dispatch("saveQuery", payload);
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
};
