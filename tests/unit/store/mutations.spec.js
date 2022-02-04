import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import mutations from "@/store/mutations";
import state from "@/store/state";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Vuex mutation", () => {
  test("SET_VIDEOS should update filteredVideos value on store", () => {
    jest.spyOn(mutations, "SET_VIDEOS");
    const videos = [
      { title: "video title", channelName: "channel name", thumb: "thumb" },
    ];
    const store = new Vuex.Store({
      state,
      mutations,
    });

    store.commit("SET_VIDEOS", videos);

    expect(mutations.SET_VIDEOS).toHaveBeenCalledWith(store.state, videos);
    expect(store.state.filteredVideos).toHaveLength(videos.length);
  });

  test("SET_FEATURED_VIDEOS should update featuredVideos value on store", () => {
    jest.spyOn(mutations, "SET_FEATURED_VIDEOS");
    const videos = [
      { title: "video title", channelName: "channel name", thumb: "thumb" },
    ];
    const store = new Vuex.Store({
      state,
      mutations,
    });

    store.commit("SET_FEATURED_VIDEOS", videos);

    expect(mutations.SET_FEATURED_VIDEOS).toHaveBeenCalledWith(
      store.state,
      videos
    );
    expect(store.state.featuredVideos).toHaveLength(videos.length);
  });

  test("SET_FEATURED_VIDEOS_BY_CATEGORY should update featuredVideosByCategory value on store", () => {
    jest.spyOn(mutations, "SET_FEATURED_VIDEOS_BY_CATEGORY");
    const videos = [
      { title: "video title", channelName: "channel name", thumb: "thumb" },
    ];
    const store = new Vuex.Store({
      state,
      mutations,
    });

    store.commit("SET_FEATURED_VIDEOS_BY_CATEGORY", videos);

    expect(mutations.SET_FEATURED_VIDEOS_BY_CATEGORY).toHaveBeenCalledWith(
      store.state,
      videos
    );
    expect(store.state.featuredVideosByCategory).toHaveLength(videos.length);
  });

  test("SET_SEARCH_HISTORY should update searchHistory value on store", () => {
    jest.spyOn(mutations, "SET_SEARCH_HISTORY");
    const searchHistory = [
      { term: "me contrata", timestamp: new Date().getTime() },
    ];
    const store = new Vuex.Store({
      state,
      mutations,
    });

    store.commit("SET_SEARCH_HISTORY", searchHistory);

    expect(mutations.SET_SEARCH_HISTORY).toHaveBeenCalledWith(
      store.state,
      searchHistory
    );
    expect(store.state.searchHistory).toHaveLength(searchHistory.length);
  });

  test("SET_ERRORS should update errors value on store", () => {
    jest.spyOn(mutations, "SET_ERRORS");
    const errors = "error";
    const store = new Vuex.Store({
      state,
      mutations,
    });

    store.commit("SET_ERRORS", errors);

    expect(mutations.SET_ERRORS).toHaveBeenCalledWith(store.state, errors);
    expect(store.state.errors).toHaveLength(errors.length);
  });

  test("SET_USER should update user value on store", () => {
    jest.spyOn(mutations, "SET_USER");
    const payload = {
      sf: "fullName",
      yv: "email",
      zN: "avatar",
    };
    const store = new Vuex.Store({
      state,
      mutations,
    });

    store.commit("SET_USER", payload);

    expect(mutations.SET_USER).toHaveBeenCalledWith(store.state, payload);
    expect(store.state.user.fullName).toBe(payload.sf);
    expect(store.state.user.email).toBe(payload.yv);
    expect(store.state.user.avatar).toBe(payload.zN);
  });
});
