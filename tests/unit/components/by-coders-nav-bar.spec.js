import Vue from "vue";
import Vuex from "vuex";
import BootstrapVue from "bootstrap-vue";
import flushPromises from "flush-promises";

import { mount, createLocalVue } from "@vue/test-utils";
import ByCodersNavBar from "./../../../src/components/ByCodersNavBar.vue";

Vue.use(BootstrapVue);
const localVue = createLocalVue();
localVue.use(Vuex);

describe("ByCodersNavBar.vue", () => {
  test("buttons should be disabled by default", () => {
    const store = new Vuex.Store({});
    const wrapper = mount(ByCodersNavBar, { store, localVue });
    const button = wrapper.find("#navBarSearchButton");

    expect(button.attributes().disabled).toBe("disabled");
  });

  test("buttons should not to be disabled when has a search value", () => {
    const store = new Vuex.Store({});
    const wrapper = mount(ByCodersNavBar, {
      store,
      localVue,
      data: () => {
        return { search: "test" };
      },
    });
    const button = wrapper.find("#navBarSearchButton");

    expect(button.attributes().disabled).toBe(undefined);
  });

  test("should show login button with doesnt have a logger user", () => {
    const store = new Vuex.Store({});
    const wrapper = mount(ByCodersNavBar, { store, localVue });
    const button = wrapper.find("#signInButton");

    expect(button.exists()).toBeTruthy();
  });

  test("should show logout button with have a logger user", () => {
    const store = new Vuex.Store({
      getters: { isLoggedIn: () => true },
    });
    const wrapper = mount(ByCodersNavBar, { store, localVue });
    const button = wrapper.find("#signOutButton");

    expect(button.exists()).toBeTruthy();
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

  test("searchVideos method should dispatch searchVideos action with search value and return success", () => {
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

  test("searchVideos method should set errors value when action return error", async () => {
    let store = new Vuex.Store({
      actions: { searchVideos: jest.fn() },
    });
    store.dispatch = jest.fn().mockRejectedValue("Error value");

    const wrapper = mount(ByCodersNavBar, {
      store,
      localVue,
      data() {
        return { search: "test", errors: null };
      },
      mocks: {
        $router: { push: jest.fn() },
      },
    });

    wrapper.find("#navBarSearchButton").trigger("click");

    await flushPromises();

    expect(store.dispatch).toHaveBeenCalledWith("searchVideos", "test");
    expect(wrapper.vm.errors).toBe("Error value");
  });

  test("login method should call login action on success", async () => {
    let store = new Vuex.Store({
      actions: { login: jest.fn() },
    });
    store.dispatch = jest.fn().mockResolvedValue({});

    const wrapper = mount(ByCodersNavBar, {
      store,
      localVue,
    });

    wrapper.find("#signInButton").trigger("click");
    await flushPromises();

    expect(store.dispatch).toHaveBeenCalledWith("login");
  });

  test("login method should set error value on failure", async () => {
    let store = new Vuex.Store({
      actions: { login: jest.fn() },
    });
    store.dispatch = jest.fn().mockRejectedValue("error");

    const wrapper = mount(ByCodersNavBar, {
      store,
      localVue,
    });

    wrapper.find("#signInButton").trigger("click");
    await flushPromises();

    expect(wrapper.vm.errors).toBe("error");
  });

  test("logout method should call logout action on success", async () => {
    let store = new Vuex.Store({
      actions: { logout: jest.fn() },
      getters: { isLoggedIn: () => true },
    });
    store.dispatch = jest.fn().mockResolvedValue({});

    const wrapper = mount(ByCodersNavBar, {
      store,
      localVue,
    });

    wrapper.find("#signOutButton").trigger("click");
    await flushPromises();

    expect(store.dispatch).toHaveBeenCalledWith("logout");
  });

  test("logout method should set error value on failure", async () => {
    let store = new Vuex.Store({
      actions: { logout: jest.fn() },
      getters: { isLoggedIn: () => true },
    });
    store.dispatch = jest.fn().mockRejectedValue("error");

    const wrapper = mount(ByCodersNavBar, {
      store,
      localVue,
    });

    wrapper.find("#signOutButton").trigger("click");
    await flushPromises();

    expect(wrapper.vm.errors).toBe("error");
  });
});
