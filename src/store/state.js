export default {
  searchHistory: JSON.parse(sessionStorage.getItem("searchHistory")) || [],
  filteredVideos: [],
  featuredVideos: [],
  featuredVideosByCategory: [],
};
