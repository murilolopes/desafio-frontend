class YoutubeVideo {
  searchVideos(q) {
    const payload = { q, part: "snippet", maxResults: 20 };
    const request = window.gapi.client.youtube.search.list(payload);

    return request.execute();
  }

  featuredVideos() {
    const request = window.gapi.client.youtube.videos.list({
      part: "snippet, contentDetails, statistics",
      chart: "mostPopular",
      regionCode: "BR",
      maxResults: 4,
    });

    return request.execute();
  }

  featuredVideosByCategory(videoCategoryId) {
    const request = window.gapi.client.youtube.videos.list({
      part: "snippet, contentDetails, statistics",
      chart: "mostPopular",
      regionCode: "BR",
      maxResults: 12,
      videoCategoryId,
    });

    return request.execute();
  }
}

export default new YoutubeVideo();
