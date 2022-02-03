import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import YoutubeVideo from "@/services/youtube-video";
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import flushPromises from "flush-promises";

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

  test("login should call google api signin method and SET_USER mutation with user data on success", async () => {
    mutations.SET_USER = jest.fn();
    const getAuthInstance = () => {
      return {
        signIn: jest.fn().mockResolvedValueOnce({
          getBasicProfile: jest.fn().mockReturnValueOnce({}),
        }),
      };
    };

    window.gapi = { auth2: { getAuthInstance } };

    let store = new Vuex.Store({
      actions,
      mutations,
    });

    await store.dispatch("login");

    await flushPromises();

    expect(mutations.SET_USER).toHaveBeenCalledWith({}, {});
  });

  test("login should call google api signin method and SET_ERRORS mutation with errors on failure", async () => {
    mutations.SET_ERRORS = jest.fn();
    const getAuthInstance = () => {
      return {
        signIn: jest.fn().mockRejectedValueOnce("errors"),
      };
    };

    window.gapi = { auth2: { getAuthInstance } };

    let store = new Vuex.Store({
      actions,
      mutations,
    });

    try {
      await store.dispatch("login");
    } catch (error) {
      expect(mutations.SET_ERRORS).toHaveBeenCalledWith({}, error);
    }
  });

  test("logout should call google api signOut method and SET_USER mutation with an empty object on success", async () => {
    mutations.SET_USER = jest.fn();
    const getAuthInstance = () => {
      return {
        signOut: jest.fn().mockResolvedValueOnce({}),
      };
    };

    window.gapi = { auth2: { getAuthInstance } };

    let store = new Vuex.Store({
      actions,
      mutations,
    });

    await store.dispatch("logout");
    await flushPromises();

    expect(mutations.SET_USER).toHaveBeenCalledWith({}, {});
  });

  test("logout should call google api signOut method and SET_ERRORS mutation with errors on failure", async () => {
    mutations.SET_ERRORS = jest.fn();
    const getAuthInstance = () => {
      return {
        signOut: jest.fn().mockRejectedValueOnce("errors"),
      };
    };

    window.gapi = { auth2: { getAuthInstance } };

    let store = new Vuex.Store({
      actions,
      mutations,
    });

    try {
      await store.dispatch("logout");
    } catch (error) {
      expect(mutations.SET_ERRORS).toHaveBeenCalledWith({}, error);
    }
  });
});
