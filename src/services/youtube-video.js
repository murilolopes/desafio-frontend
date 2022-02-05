class YoutubeVideo {
  searchVideos(q) {
    const payload = { q, part: "snippet", maxResults: 20 };
    const request = window.gapi.client.youtube.search.list(payload);

    return request.getPromise();
  }

  featuredVideos() {
    const request = window.gapi.client.youtube.videos.list({
      part: "snippet, contentDetails, statistics",
      chart: "mostPopular",
      regionCode: "BR",
      maxResults: 4,
    });

    return request.getPromise();
  }

  featuredVideosByCategory(videoCategoryId) {
    const request = window.gapi.client.youtube.videos.list({
      part: "snippet, contentDetails, statistics",
      chart: "mostPopular",
      regionCode: "BR",
      maxResults: 12,
      videoCategoryId,
    });

    return request.getPromise();
  }
}

export default new YoutubeVideo();
