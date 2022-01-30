import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

import { mount } from "@vue/test-utils";
import VideoCard from "./../../../src/components/VideoCard.vue";

Vue.use(BootstrapVue);

describe("VideoCard.vue", () => {
  test("should render a video title", () => {
    const wrapper = mount(VideoCard, {
      propsData: {
        title: "Video Title",
        tags: [],
      },
    });
    expect(wrapper.text()).toContain("Video Title");
  });

  test("should render a channel name", () => {
    const wrapper = mount(VideoCard, {
      propsData: {
        channelName: "ByCoders",
        tags: [],
      },
    });
    expect(wrapper.text()).toContain("ByCoders");
  });

  test("should render a img tag with thumb src", () => {
    const thumb =
      "https://www.bycoders.com.br/static/media/logo_bycoders_.e8adf476.svg";
    const wrapper = mount(VideoCard, {
      propsData: {
        tags: [],
        thumb,
      },
    });

    expect(wrapper.find("img").attributes().src).toContain(thumb);
  });
});
