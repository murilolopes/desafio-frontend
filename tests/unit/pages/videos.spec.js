import Vue from "vue";
import Vuex from "vuex";

import BootstrapVue from "bootstrap-vue";
import Videos from "@/views/pages/Videos.vue";
import VideoCard from "@/components/VideoCard.vue";

import { mount, createLocalVue } from "@vue/test-utils";

Vue.use(BootstrapVue);
const localVue = createLocalVue();
localVue.use(Vuex);

describe("Videos.vue", () => {
  test("should render one featured-videos and two featured-videos-by-category", () => {
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
    ];

    const store = new Vuex.Store({
      getters: {
        filteredVideos: () => videos,
      },
    });

    const wrapper = mount(Videos, { store, localVue });

    const videoCards = wrapper.findAllComponents(VideoCard);
    expect(videoCards).toHaveLength(4);
  });
});
