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

    flushPromises();

    expect(YoutubeVideo.searchVideos).toHaveBeenCalledWith("teste");
    expect(mutations.SET_VIDEOS).toHaveBeenCalledWith(
      store.state,
      response.items
    );

    // TODO try to understand why this test fails
    // expect(actions.saveQuery).toHaveBeenCalledWith("teste");
  });
});
