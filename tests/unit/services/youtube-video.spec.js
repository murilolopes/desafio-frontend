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
});
