class YoutubeVideo {
  searchVideos(q) {
    const payload = { q, part: "snippet", maxResults: 20 };
    const request = window.gapi.client.youtube.search.list(payload);

    return new Promise((resolve, reject) => {
      request.execute(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  featuredVideos() {
    const request = window.gapi.client.youtube.videos.list({
      part: "snippet, contentDetails, statistics",
      chart: "mostPopular",
      regionCode: "BR",
      maxResults: 4,
    });

    return new Promise((resolve, reject) => {
      request.execute(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
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
