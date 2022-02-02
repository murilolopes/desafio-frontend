import YoutubeVideo from "@/services/youtube-video.js";

export default {
  async searchVideos({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      YoutubeVideo.searchVideos(payload)
        .then((response) => {
          commit("SET_VIDEOS", response.items, { root: true });
          dispatch("saveQuery", payload);
          resolve(response);
        })
        .catch((error) => {
          commit("SET_ERRORS", error);
          reject(error);
        });
    });
  },
  async featuredVideos({ commit }) {
    return new Promise((resolve, reject) => {
      YoutubeVideo.featuredVideos()
        .then((response) => {
          commit("SET_FEATURED_VIDEOS", response.items, { root: true });
          resolve(response);
        })
        .catch((error) => {
          commit("SET_ERRORS", error);
          reject(error);
        });
    });
  },
  async featuredVideosByCategory({ commit }, videoCategoryId) {
    return new Promise((resolve, reject) => {
      YoutubeVideo.featuredVideosByCategory(videoCategoryId)
        .then((response) => {
          commit(
            "SET_FEATURED_VIDEOS_BY_CATEGORY",
            { videoCategoryId, items: response.items },
            { root: true }
          );
          resolve(response);
        })
        .catch((error) => {
          commit("SET_ERRORS", error);
          reject(error);
        });
    });
  },
  saveQuery({ commit }, payload) {
    let currentHistory =
      JSON.parse(sessionStorage.getItem("searchHistory")) || [];

    currentHistory.push({
      term: payload,
      timestamp: new Date().getTime(),
    });

    commit("SET_SEARCH_HISTORY", currentHistory);
    sessionStorage.setItem("searchHistory", JSON.stringify(currentHistory));

    return currentHistory;
  },
};
