import Vue from "vue";
import Vuex from "vuex";
import BootstrapVue from "bootstrap-vue";

import { mount, createLocalVue } from "@vue/test-utils";
import ByCodersNavBar from "./../../../src/components/ByCodersNavBar.vue";

Vue.use(BootstrapVue);
const localVue = createLocalVue();
localVue.use(Vuex);

describe("ByCodersNavBar.vue", () => {
  test("buttons should be disabled by default", () => {
    const wrapper = mount(ByCodersNavBar);
    const button = wrapper.find("#navBarSearchButton");

    expect(button.attributes().disabled).toBe("disabled");
  });

  test("buttons should not to be disabled when has a search value", () => {
    const wrapper = mount(ByCodersNavBar, {
      data: () => {
        return { search: "test" };
      },
    });
    const button = wrapper.find("#navBarSearchButton");

    expect(button.attributes().disabled).toBe(undefined);
  });

  test("should call searchVideos when click in button", () => {
    const store = new Vuex.Store({});
    const wrapper = mount(ByCodersNavBar, {
      store,
      localVue,
      data() {
        return { search: "test" };
      },
    });

    wrapper.vm.searchVideos = jest.fn();
    const button = wrapper.find("#navBarSearchButton");
    button.trigger("click");

    expect(wrapper.vm.searchVideos).toHaveBeenCalled();
  });

  test("searchVideos method should dispatch searchVideos action with search value and retur success", () => {
    let store = new Vuex.Store({
      actions: { searchVideos: jest.fn() },
    });
    store.dispatch = jest.fn().mockResolvedValueOnce();

    const wrapper = mount(ByCodersNavBar, {
      store,
      localVue,
      data() {
        return { search: "test" };
      },
      mocks: {
        $router: { push: jest.fn() },
      },
    });

    wrapper.find("#navBarSearchButton").trigger("click");

    expect(store.dispatch).toHaveBeenCalledWith("searchVideos", "test");
    // TODO: check if router is called
    // expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: "Videos" });
  });
});
