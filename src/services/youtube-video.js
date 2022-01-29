class YoutubeVideo {
  searchVideos(q) {
    const request = window.gapi.client.youtube.search.list({
      q: q,
      part: "snippet",
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

  topVideos() {
    const request = window.gapi.client.youtube.videos.list({
      part: "snippet, contentDetails, statistics",
      chart: "mostPopular",
      regionCode: "BR",
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
