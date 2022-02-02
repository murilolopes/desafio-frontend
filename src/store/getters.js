export default {
  filteredVideos(state) {
    let videos = [];
    state.filteredVideos.filter((video) => {
      const thumb =
        video.snippet.thumbnails.maxres?.url ||
        video.snippet.thumbnails.default.url;

      videos.push({
        title: video.snippet.title,
        channelName: video.snippet.channelTitle,
        thumb,
      });
    });

    return videos;
  },
  filteredFeaturedVideos(state) {
    let videos = [];
    state.featuredVideos.filter((video) => {
      const thumb =
        video.snippet.thumbnails.maxres?.url ||
        video.snippet.thumbnails.default.url;

      videos.push({
        title: video.snippet.title,
        channelName: video.snippet.channelTitle,
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
        const thumb =
          video.snippet.thumbnails.maxres?.url ||
          video.snippet.thumbnails.default.url;

        videos.push({
          title: video.snippet.title,
          channelName: video.snippet.channelTitle,
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
        formated_timestamp: new Date(item.timestamp).toLocaleString("pt-BR"),
      });
    });

    return history.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
  },
  isLoggedIn(state) {
    return !!state.user.email;
  },
};
