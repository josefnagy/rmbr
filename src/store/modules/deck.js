import axios from "axios";

export const namespaced = true;

export const state = {
  decks: [
    // {
    //   name: "Javascript",
    //   totalCards: 57,
    //   cardsToStudy: 20,
    //   updatedAt: "2022-15-01",
    // },
  ],
};

export const mutations = {
  SET_DECKS_DATA(state, decksData) {
    state.decks = decksData;
    localStorage.setItem("decks", JSON.stringify(decksData));
  },

  CLEAR_DECKS_DATA() {
    state.decks = [];
    localStorage.removeItem("decks");
  },
};
export const actions = {
  getDecks({ commit }, userId) {
    const decksString = localStorage.getItem("decks");
    const decksData = JSON.parse(decksString);
    if (decksData) {
      const decksData = JSON.parse(decksString);
      commit("SET_DECKS_DATA", decksData);
    } else {
      return axios
        .get("//localhost:3000/api/decks", {
          params: { id: userId },
        })
        .then(({ data }) => {
          commit("SET_DECKS_DATA", data.decks);
        });
    }
  },
};
export const getters = {};
