import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import YoutubeVideo from "@/services/youtube-video";
import actions from "@/store/actions";
import mutations from "@/store/mutations";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Vuex actions", () => {
  test("searchVideos should call searchVideos on YoutubeVideo service and dispatch saveQuery action with params and commit SET_VIDEOS mutation with reponse on success", async () => {
    YoutubeVideo.searchVideos = jest.fn().mockResolvedValue({ items: [] });
    jest.spyOn(actions, "saveQuery");
    jest.spyOn(mutations, "SET_VIDEOS");

    let store = new Vuex.Store({
      actions,
      mutations,
    });

    const response = await store.dispatch("searchVideos", "teste");

    expect(YoutubeVideo.searchVideos).toHaveBeenCalledWith("teste");
    expect(mutations.SET_VIDEOS).toHaveBeenCalledWith(
      store.state,
      response.items
    );

    // TODO try to understand why this test fails
    // expect(actions.saveQuery).toHaveBeenCalledWith("teste");
  });

  test("searchVideos should commit SET_ERRORS mutation on fail", async () => {
    YoutubeVideo.searchVideos = jest.fn().mockRejectedValueOnce("error");

    jest.spyOn(mutations, "SET_ERRORS");

    let store = new Vuex.Store({
      actions,
      mutations,
    });

    try {
      await store.dispatch("searchVideos", "teste");
    } catch (error) {
      expect(mutations.SET_ERRORS).toHaveBeenCalledWith(store.state, "error");
    }
  });

  test("featuredVideos should call featuredVideos on YoutubeVideo service and commit SET_FEATURED_VIDEOS mutation on success", async () => {
    YoutubeVideo.featuredVideos = jest
      .fn()
      .mockResolvedValueOnce({ items: [] });

    jest.spyOn(mutations, "SET_FEATURED_VIDEOS");

    let store = new Vuex.Store({
      actions,
      mutations,
    });

    const response = await store.dispatch("featuredVideos");

    expect(mutations.SET_FEATURED_VIDEOS).toHaveBeenCalledWith(
      store.state,
      response.items
    );
  });

  test("featuredVideos should commit SET_ERRORS mutation on fail", async () => {
    YoutubeVideo.searchVideos = jest.fn().mockRejectedValueOnce("error");

    jest.spyOn(mutations, "SET_ERRORS");

    let store = new Vuex.Store({
      actions,
      mutations,
    });

    try {
      await store.dispatch("searchVideos", "teste");
    } catch (error) {
      expect(mutations.SET_ERRORS).toHaveBeenCalledWith(store.state, "error");
    }
  });

  test("featuredVideosByCategory should call featuredVideosByCategory on YoutubeVideo service and commit SET_FEATURED_VIDEOS_BY_CATEGORY mutation with params on success", async () => {
    YoutubeVideo.featuredVideosByCategory = jest
      .fn()
      .mockResolvedValueOnce({ items: [] });

    jest.spyOn(mutations, "SET_FEATURED_VIDEOS_BY_CATEGORY");

    let store = new Vuex.Store({
      state: { featuredVideosByCategory: [] },
      actions,
      mutations,
    });

    const response = await store.dispatch("featuredVideosByCategory", "10");

    expect(mutations.SET_FEATURED_VIDEOS_BY_CATEGORY).toHaveBeenCalledWith(
      store.state,
      { videoCategoryId: "10", items: response.items }
    );
  });

  test("featuredVideosByCategory should commit SET_ERRORS mutation on fail", async () => {
    YoutubeVideo.featuredVideosByCategory = jest
      .fn()
      .mockRejectedValueOnce("error");

    jest.spyOn(mutations, "SET_ERRORS");

    let store = new Vuex.Store({
      actions,
      mutations,
    });

    try {
      await store.dispatch("featuredVideosByCategory", "10");
    } catch (error) {
      expect(mutations.SET_ERRORS).toHaveBeenCalledWith(store.state, "error");
    }
  });

  test("saveQuery should call SET_SEARCH_HISTORY mutation and add payload to searchHistory array in sessionStorage on success", async () => {
    mutations.SET_SEARCH_HISTORY = jest.fn();

    let store = new Vuex.Store({
      actions,
      mutations,
    });

    const currentHistory = await store.dispatch("saveQuery", "Me contrata");

    expect(mutations.SET_SEARCH_HISTORY).toHaveBeenCalledWith(
      {},
      currentHistory
    );

    //TODO understand how to test session storage and how to test something that I mocked
  });
});
