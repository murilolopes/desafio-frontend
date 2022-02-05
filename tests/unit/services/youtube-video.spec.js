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
});
