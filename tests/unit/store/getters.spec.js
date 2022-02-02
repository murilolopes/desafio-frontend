import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import getters from "@/store/getters";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Vuex mutation", () => {
  test("filteredVideos should return a formated video array", () => {
    const state = {
      filteredVideos: [
        {
          snippet: {
            title: "title",
            channelTitle: "channelTitle",
            thumbnails: {
              default: { url: "https://example.com/default.jpg" },
              maxres: { url: "https://example.com/default.jpg" },
            },
          },
        },
        {
          snippet: {
            title: "title1",
            channelTitle: "channelTitle1",
            thumbnails: {
              default: { url: "https://example.com/default.jpg" },
            },
          },
        },
      ],
    };

    const filteredVideos = getters.filteredVideos(state);

    expect(filteredVideos).toHaveLength(state.filteredVideos.length);
    expect(filteredVideos[0].title).toBe(state.filteredVideos[0].snippet.title);
    expect(filteredVideos[0].channelName).toBe(
      state.filteredVideos[0].snippet.channelTitle
    );
    expect(filteredVideos[0].thumb).toBe(
      state.filteredVideos[0].snippet.thumbnails.maxres.url
    );
    expect(filteredVideos[1].thumb).toBe(
      state.filteredVideos[1].snippet.thumbnails.default.url
    );
  });

  test("filteredFeaturedVideos should return a formated video array", () => {
    const state = {
      featuredVideos: [
        {
          snippet: {
            title: "title",
            channelTitle: "channelTitle",
            thumbnails: {
              default: { url: "https://example.com/default.jpg" },
              maxres: { url: "https://example.com/default.jpg" },
            },
          },
        },
        {
          snippet: {
            title: "title1",
            channelTitle: "channelTitle1",
            thumbnails: {
              default: { url: "https://example.com/default.jpg" },
            },
          },
        },
      ],
    };

    const filteredFeaturedVideos = getters.filteredFeaturedVideos(state);

    expect(filteredFeaturedVideos).toHaveLength(state.featuredVideos.length);
    expect(filteredFeaturedVideos[0].title).toBe(
      state.featuredVideos[0].snippet.title
    );
    expect(filteredFeaturedVideos[0].channelName).toBe(
      state.featuredVideos[0].snippet.channelTitle
    );
    expect(filteredFeaturedVideos[0].thumb).toBe(
      state.featuredVideos[0].snippet.thumbnails.maxres.url
    );
    expect(filteredFeaturedVideos[1].thumb).toBe(
      state.featuredVideos[1].snippet.thumbnails.default.url
    );
  });

  test("filteredFeaturedVideosByCategory should return a formated video array", () => {
    const state = {
      featuredVideosByCategory: [
        {
          videoCategoryId: "1",
          items: [
            {
              snippet: {
                title: "title",
                channelTitle: "channelTitle",
                thumbnails: {
                  default: { url: "https://example.com/default.jpg" },
                  maxres: { url: "https://example.com/default.jpg" },
                },
              },
            },
            {
              snippet: {
                title: "title1",
                channelTitle: "channelTitle1",
                thumbnails: {
                  default: { url: "https://example.com/default.jpg" },
                },
              },
            },
          ],
        },
        {
          videoCategoryId: "2",
          items: [
            {
              snippet: {
                title: "title1",
                channelTitle: "channelTitle1",
                thumbnails: {
                  default: { url: "https://example.com/default.jpg" },
                },
              },
            },
          ],
        },
      ],
    };

    const filteredFeaturedVideosByCategory =
      getters.filteredFeaturedVideosByCategory(state);

    expect(filteredFeaturedVideosByCategory).toHaveLength(
      state.featuredVideosByCategory.length
    );
    expect(filteredFeaturedVideosByCategory[0].items[0].title).toBe(
      state.featuredVideosByCategory[0].items[0].snippet.title
    );
    expect(filteredFeaturedVideosByCategory[0].items[0].channelName).toBe(
      state.featuredVideosByCategory[0].items[0].snippet.channelTitle
    );
    expect(filteredFeaturedVideosByCategory[0].items[0].thumb).toBe(
      state.featuredVideosByCategory[0].items[0].snippet.thumbnails.maxres.url
    );
    expect(filteredFeaturedVideosByCategory[1].items[0].thumb).toBe(
      state.featuredVideosByCategory[1].items[0].snippet.thumbnails.default.url
    );
  });

  test("formatedSearchHistory should return a formated and sorted serachHistory data", () => {
    const state = {
      searchHistory: [
        {
          term: "term 1",
          timestamp: new Date(2022, 0, 1, 5, 5, 1, 1).getTime(),
        },
        {
          term: "term 3",
          timestamp: new Date(2022, 0, 1, 5, 5, 3, 3).getTime(),
        },
        {
          term: "term 2",
          timestamp: new Date(2022, 0, 1, 5, 5, 2, 2).getTime(),
        },
      ],
    };

    const formatedSearchHistory = getters.formatedSearchHistory(state);

    expect(formatedSearchHistory).toHaveLength(state.searchHistory.length);
    expect(formatedSearchHistory[0].term).toBe(state.searchHistory[1].term);
    expect(formatedSearchHistory[formatedSearchHistory.length - 1].term).toBe(
      state.searchHistory[0].term
    );
    expect(formatedSearchHistory[0].formated_timestamp).toBe(
      "1/1/2022, 5:05:03 AM"
    );
  });
});
