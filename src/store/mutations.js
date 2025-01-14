export default {
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
  SET_USER(state, payload) {
    state.user = {
      fullName: payload.sf,
      email: payload.yv,
      avatar: payload.zN,
    };
  },
  SET_ERRORS(state, payload) {
    state.errors = payload;
  },
};
