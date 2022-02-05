import Vue from "vue";
import Vuex from "vuex";
import BootstrapVue from "bootstrap-vue";

import { mount, createLocalVue } from "@vue/test-utils";
import FeaturedVideos from "./../../../src/components/FeaturedVideos.vue";
import VideoCard from "./../../../src/components/VideoCard.vue";

Vue.use(BootstrapVue);
const localVue = createLocalVue();
localVue.use(Vuex);

describe("FeaturedVideos.vue", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test("should dispatch featuredVideos action after 3 seconds", () => {
    const store = new Vuex.Store({
      actions: {
        featuredVideos: () => {},
      },
      getters: {
        filteredFeaturedVideos: () => [],
      },
    });

    store.dispatch = jest.fn();

    mount(FeaturedVideos, {
      store,
      localVue,
    });

    jest.runTimersToTime(3000);

    expect(store.dispatch).toHaveBeenCalledWith("featuredVideos");
  });

  test("should video computed return only current category videos from store", () => {
    const videos = [
      {
        title: "title1",
        channelName: "channelName1",
        thumb: "thumb1",
      },
      {
        title: "title2",
        channelName: "channelName2",
        thumb: "thumb2",
      },
      {
        title: "title3",
        channelName: "channelName3",
        thumb: "thumb3",
      },
      {
        title: "title4",
        channelName: "channelName4",
        thumb: "thumb4",
      },
      {
        title: "title5",
        channelName: "channelName5",
        thumb: "thumb5",
      },
    ];

    const store = new Vuex.Store({
      actions: {
        featuredVideos: () => {},
      },
      getters: {
        filteredFeaturedVideos: () => videos,
      },
    });

    store.dispatch = jest.fn();

    const wrapper = mount(FeaturedVideos, {
      store,
      localVue,
    });

    expect(wrapper.vm.videos.length).toEqual(5);
  });

  test("should render 5 video-card components", () => {
    const videos = [
      {
        title: "title1",
        channelName: "channelName1",
        thumb: "thumb1",
      },
      {
        title: "title2",
        channelName: "channelName2",
        thumb: "thumb2",
      },
      {
        title: "title3",
        channelName: "channelName3",
        thumb: "thumb3",
      },
      {
        title: "title4",
        channelName: "channelName4",
        thumb: "thumb4",
      },
      {
        title: "title5",
        channelName: "channelName5",
        thumb: "thumb5",
      },
    ];

    const store = new Vuex.Store({
      actions: {
        featuredVideos: () => {},
      },
      getters: {
        filteredFeaturedVideos: () => videos,
      },
    });

    const wrapper = mount(FeaturedVideos, {
      store,
      localVue,
    });

    const cards = wrapper.findAllComponents(VideoCard);

    expect(cards).toHaveLength(5);
    cards.wrappers.forEach((wrapper, i) => {
      expect(wrapper.props().title).toBe(videos[i].title);
      expect(wrapper.props().channelName).toBe(videos[i].channelName);
      expect(wrapper.props().thumb).toBe(videos[i].thumb);
    });
  });

  test("should dispatch featuredVideos action after 3 seconds", () => {
    const store = new Vuex.Store({
      actions: {
        featuredVideos: () => {},
      },
      getters: {
        filteredFeaturedVideos: () => [],
      },
    });

    store.dispatch = jest.fn();

    mount(FeaturedVideos, {
      store,
      localVue,
    });

    jest.runTimersToTime(3000);

    expect(store.dispatch).toHaveBeenCalledWith("featuredVideos");
  });

  test("computed videos should return and four treat filteredFeaturedVideos from store", () => {
    const videos = [
      {
        title: "title1",
        channelName: "channelName1",
        thumb: "thumb1",
      },
      {
        title: "title2",
        channelName: "channelName2",
        thumb: "thumb2",
      },
      {
        title: "title3",
        channelName: "channelName3",
        thumb: "thumb3",
      },
      {
        title: "title4",
        channelName: "channelName4",
        thumb: "thumb4",
      },
      {
        title: "title5",
        channelName: "channelName5",
        thumb: "thumb5",
      },
    ];

    const store = new Vuex.Store({
      getters: {
        filteredFeaturedVideos: () => videos,
      },
    });

    const wrapper = mount(FeaturedVideos, {
      store,
      localVue,
    });

    expect(wrapper.vm.videos).toHaveLength(5);
    wrapper.vm.videos.forEach((video, i) => {
      expect(video.title).toBe(videos[i].title);
      expect(video.channelName).toBe(videos[i].channelName);
      expect(video.thumb).toBe(videos[i].thumb);
    });
  });
});
