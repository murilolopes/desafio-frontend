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

  test("should render list at least 5 tags", () => {
    let tags = ["ByCoders", "Vue1", "<3", "Vue2", "Murilo", "Vue3"];
    const wrapper = mount(VideoCard, {
      propsData: {
        tags,
      },
    });

    const joinedTags = tags.slice(0, 5).join(", ");
    expect(wrapper.text()).toContain(joinedTags);
  });

  test("should render views counter", () => {
    const viewCounter = 20000;
    const wrapper = mount(VideoCard, {
      propsData: {
        tags: [],
        viewCounter,
      },
    });

    expect(wrapper.text()).toContain(viewCounter);
  });

  test("should render likes counter", () => {
    const likeCounter = 5000;
    const wrapper = mount(VideoCard, {
      propsData: {
        tags: [],
        likeCounter,
      },
    });

    expect(wrapper.text()).toContain(likeCounter);
  });

  test("should render comments counter", () => {
    const commentCounter = 782;
    const wrapper = mount(VideoCard, {
      propsData: {
        tags: [],
        commentCounter,
      },
    });

    expect(wrapper.text()).toContain(commentCounter);
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
