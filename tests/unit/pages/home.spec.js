import Home from "@/views/pages/Home.vue";
import FeaturedVideos from "@/components/FeaturedVideos.vue";
import FeaturedVideosByCategory from "@/components/FeaturedVideosByCategory.vue";
import { shallowMount } from "@vue/test-utils";

describe("Home.vue", () => {
  test("should render one featured-videos and two featured-videos-by-category", () => {
    const wrapper = shallowMount(Home);

    const featuredVideos = wrapper.findAllComponents(FeaturedVideos);
    const featuredVideosByCategory = wrapper.findAllComponents(
      FeaturedVideosByCategory
    );

    expect(featuredVideos).toHaveLength(1);
    expect(featuredVideosByCategory).toHaveLength(2);
  });
});
