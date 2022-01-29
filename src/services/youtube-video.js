class YoutubeVideo {
  fetchVideos(q) {
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
          reject("error:", error);
        }
      );
    });
  }
}

export default new YoutubeVideo();
