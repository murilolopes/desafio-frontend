class YoutubeVideo {
  searchVideos(q) {
    const request = window.gapi.client.youtube.search.list({
      q,
      part: "snippet",
      maxResults: 20,
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
}

export default new YoutubeVideo();
