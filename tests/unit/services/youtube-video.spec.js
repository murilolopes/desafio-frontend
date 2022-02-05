import YoutubeVideo from "../../../src/services/youtube-video";

describe("YoutubeVideo service", () => {
  test("searchVideos should call gapi.client.youtube.search.list method and return success", async () => {
    window.gapi = {
      client: {
        youtube: {
          search: {
            list: jest.fn().mockReturnValue({
              getPromise: jest.fn().mockResolvedValue("success"),
            }),
          },
        },
      },
    };

    const query = "query";
    const payload = {
      part: "snippet",
      maxResults: 20,
    };

    const response = YoutubeVideo.searchVideos(query);

    expect(window.gapi.client.youtube.search.list).toHaveBeenCalledWith({
      q: query,
      ...payload,
    });
    expect(
      window.gapi.client.youtube.search.list().getPromise
    ).toHaveBeenCalled();
    expect(response).resolves.toBe("success");
  });

  test("searchVideos should call gapi.client.youtube.search.list method and return failure", async () => {
    window.gapi = {
      client: {
        youtube: {
          search: {
            list: jest.fn().mockReturnValue({
              getPromise: jest.fn().mockRejectedValue("failure"),
            }),
          },
        },
      },
    };

    try {
      YoutubeVideo.searchVideos();
    } catch (error) {
      expect(error).rejects.toBe("failure");
    }
  });

  test("featuredVideos should call gapi.client.youtube.videos.list method and return success", async () => {
    window.gapi = {
      client: {
        youtube: {
          videos: {
            list: jest.fn().mockReturnValue({
              getPromise: jest.fn().mockResolvedValue("success"),
            }),
          },
        },
      },
    };

    const payload = {
      part: "snippet, contentDetails, statistics",
      chart: "mostPopular",
      regionCode: "BR",
      maxResults: 5,
    };

    const response = YoutubeVideo.featuredVideos();

    expect(window.gapi.client.youtube.videos.list).toHaveBeenCalledWith(
      payload
    );
    expect(
      window.gapi.client.youtube.videos.list().getPromise
    ).toHaveBeenCalled();
    expect(response).resolves.toBe("success");
  });

  test("featuredVideos should call gapi.client.youtube.videos.list method and return failure", async () => {
    window.gapi = {
      client: {
        youtube: {
          videos: {
            list: jest.fn().mockReturnValue({
              getPromise: jest.fn().mockRejectedValue("failure"),
            }),
          },
        },
      },
    };

    try {
      YoutubeVideo.featuredVideos();
    } catch (error) {
      expect(error).rejects.toBe("failure");
    }
  });

  test("featuredVideosByCategory should call gapi.client.youtube.videos.list method and return success", async () => {
    window.gapi = {
      client: {
        youtube: {
          videos: {
            list: jest.fn().mockReturnValue({
              getPromise: jest.fn().mockResolvedValue("success"),
            }),
          },
        },
      },
    };

    const videoCategoryId = "1";
    const payload = {
      part: "snippet, contentDetails, statistics",
      chart: "mostPopular",
      regionCode: "BR",
      maxResults: 12,
    };

    const result = YoutubeVideo.featuredVideosByCategory(videoCategoryId);

    expect(window.gapi.client.youtube.videos.list).toHaveBeenCalledWith({
      videoCategoryId,
      ...payload,
    });

    expect(
      window.gapi.client.youtube.videos.list().getPromise
    ).toHaveBeenCalled();
    expect(result).resolves.toBe("success");
  });

  test("featuredVideosByCategory should call gapi.client.youtube.videos.list method and return failure", async () => {
    window.gapi = {
      client: {
        youtube: {
          videos: {
            list: jest.fn().mockReturnValue({
              getPromise: jest.fn().mockRejectedValue("failure"),
            }),
          },
        },
      },
    };

    const videoCategoryId = "1";

    try {
      YoutubeVideo.featuredVideosByCategory(videoCategoryId);
    } catch (error) {
      expect(error).rejects.toBe("failure");
    }
  });
});
