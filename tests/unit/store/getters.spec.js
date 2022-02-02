import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import getters from "@/store/getters";
import state from "@/store/state";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Vuex mutation", () => {
  test("formatedSearchHistory should return a formated and sorted serachHistory data", () => {
    const searchHistory = [
      {
        term: "term 1",
        timestamp: new Date(2022, 0, 1, 5, 5, 1, 1).getTime(),
      },
      {
        term: "term 3",
        timestamp: new Date(2022, 0, 1, 5, 5, 3, 3).getTime(),
      },
      {
        term: "term 2",
        timestamp: new Date(2022, 0, 1, 5, 5, 2, 2).getTime(),
      },
    ];

    state.searchHistory = searchHistory;
    const formatedSearchHistory = getters.formatedSearchHistory(state);

    expect(formatedSearchHistory).toHaveLength(searchHistory.length);
    expect(formatedSearchHistory[0].term).toBe(searchHistory[1].term);
    expect(formatedSearchHistory[formatedSearchHistory.length - 1].term).toBe(
      searchHistory[0].term
    );
    expect(formatedSearchHistory[0].formated_timestamp).toBe(
      "1/1/2022, 5:05:03 AM"
    );
  });
});
