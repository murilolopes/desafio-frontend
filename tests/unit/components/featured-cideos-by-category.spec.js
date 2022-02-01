import Vue from "vue";
import Vuex from "vuex";
import BootstrapVue from "bootstrap-vue";

import { mount, createLocalVue } from "@vue/test-utils";
import FeaturedVideosByCategory from "./../../../src/components/FeaturedVideosByCategory.vue";
import VideoCard from "./../../../src/components/VideoCard.vue";

Vue.use(BootstrapVue);
const localVue = createLocalVue();
localVue.use(Vuex);

describe("FeaturedVideosByCategory.vue", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test("should dispatch featuredVideosByCategory action after 3 seconds with videoCategoryId as parameter", () => {
    const store = new Vuex.Store({
      actions: {
        featuredVideosByCategory: () => {},
      },
      getters: {
        filteredFeaturedVideosByCategory: () => [],
      },
    });

    store.dispatch = jest.fn();

    mount(FeaturedVideosByCategory, {
      store,
      localVue,
      propsData: {
        videoCategoryId: "1",
      },
    });

    jest.runTimersToTime(3000);

    expect(store.dispatch).toHaveBeenCalledWith(
      "featuredVideosByCategory",
      "1"
    );
  });

  test("should video computed return only current category videos from store", () => {
    const category1 = {
      videoCategoryId: "1",
      items: [
        {
          title: "title1",
          channelName: "channelName1",
          thumb: "thumb1",
        },
      ],
    };

    const category2 = {
      videoCategoryId: "2",
      items: [
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
      ],
    };

    const store = new Vuex.Store({
      getters: {
        filteredFeaturedVideosByCategory: () => [category1, category2],
      },
    });

    store.dispatch = jest.fn();

    const wrapper = mount(FeaturedVideosByCategory, {
      store,
      localVue,
      propsData: {
        videoCategoryId: "1",
      },
    });

    expect(wrapper.vm.videos.length).toEqual(1);
    expect(wrapper.vm.videos[0]).toBe(category1.items[0]);
  });

  test("should render 2 video-card components", () => {
    const category2 = {
      videoCategoryId: "2",
      items: [
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
      ],
    };

    const store = new Vuex.Store({
      getters: {
        filteredFeaturedVideosByCategory: () => [category2],
      },
    });

    store.dispatch = jest.fn();

    const wrapper = mount(FeaturedVideosByCategory, {
      store,
      localVue,
      propsData: {
        videoCategoryId: "2",
      },
    });

    const cards = wrapper.findAllComponents(VideoCard);

    expect(cards).toHaveLength(2);
    cards.wrappers.forEach((wrapper, i) => {
      expect(wrapper.props().title).toBe(category2.items[i].title);
      expect(wrapper.props().channelName).toBe(category2.items[i].channelName);
      expect(wrapper.props().thumb).toBe(category2.items[i].thumb);
    });
  });
});
