import YoutubeVideo from "../../../src/services/youtube-video";

describe("YoutubeVideo service", () => {
  test("searchVideos should call gapi.client.youtube.search.list method and resolve promise", async () => {
    window.gapi = {
      client: {
        youtube: {
          search: {
            list: jest.fn().mockReturnValue({
              execute: jest.fn(),
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

    YoutubeVideo.searchVideos(query);

    expect(window.gapi.client.youtube.search.list).toHaveBeenCalledWith({
      q: query,
      ...payload,
    });

    expect(window.gapi.client.youtube.search.list().execute).toHaveBeenCalled();
  });

  test("featuredVideos should call gapi.client.youtube.videos.list method and resolve promise", async () => {
    window.gapi = {
      client: {
        youtube: {
          videos: {
            list: jest.fn().mockReturnValue({
              execute: jest.fn(),
            }),
          },
        },
      },
    };

    const payload = {
      part: "snippet, contentDetails, statistics",
      chart: "mostPopular",
      regionCode: "BR",
      maxResults: 4,
    };

    YoutubeVideo.featuredVideos();

    expect(window.gapi.client.youtube.videos.list).toHaveBeenCalledWith(
      payload
    );

    expect(window.gapi.client.youtube.videos.list().execute).toHaveBeenCalled();
  });

  test("featuredVideosByCategory should call gapi.client.youtube.videos.list method and return success", async () => {
    window.gapi = {
      client: {
        youtube: {
          videos: {
            list: jest.fn().mockReturnValue({
              execute: jest.fn().mockResolvedValue("success"),
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

    expect(window.gapi.client.youtube.videos.list().execute).toHaveBeenCalled();
    expect(result).resolves.toBe("success");
  });

  test("featuredVideosByCategory should call gapi.client.youtube.videos.list method and return failure", async () => {
    window.gapi = {
      client: {
        youtube: {
          videos: {
            list: jest.fn().mockReturnValue({
              execute: jest.fn().mockRejectedValue("failure"),
            }),
          },
        },
      },
    };

    const videoCategoryId = "1";

    try {
      await YoutubeVideo.featuredVideosByCategory(videoCategoryId);
    } catch (error) {
      expect(error).toBe("failure");
    }
  });
});
