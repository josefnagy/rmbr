import axios from "axios";

export const namespaced = true;

// defuald decks should be getted from localStorage
export const state = {
  cookies: false,
  decks: [
    // {
    //   name: "Javascript",
    //   totalCards: 57,
    //   cardsToStudy: 20,
    //   updatedAt: "2022-15-01",
    // },
  ],
  selectedDeck: [],
};

export const mutations = {
  SET_DECKS_DATA(state, decksData) {
    state.decks = decksData;
    localStorage.setItem("decks", JSON.stringify(decksData));
  },

  SET_CARDS(state, cardsData) {
    // console.log(cardsData);
    state.selectedDeck = cardsData;
    localStorage.setItem("cards", JSON.stringify(cardsData));
  },

  CLEAR_DECKS_DATA() {
    state.decks = null;
    localStorage.removeItem("decks");
  },

  ADD_DECK(state, deck) {
    state.decks.push(deck);
    localStorage.setItem("decks", JSON.stringify(state.decks));
  },
};
export const actions = {
  getDecks({ commit, state }, userId) {
    const decksString = localStorage.getItem("decks");
    const decksData = JSON.parse(decksString);
    if (state.cookies && decksData && decksData.length !== 0) {
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
  getCards({ commit, state }, { userId, deckId }) {
    const cardsString = localStorage.getItem("cards");
    const cardsData = JSON.parse(cardsString);

    if (state.cookies && cardsData && cardsData.length !== 0) {
      const cardsData = JSON.parse(cardsString);
      commit("SET_CARDS", cardsData);
    } else {
      return axios
        .get(`//localhost:3000/api/decks/${deckId}`, {
          params: { id: userId },
        })
        .then(({ data }) => {
          // console.log(data);
          commit("SET_CARDS", data.cards);
        });
    }
  },
  addDeck({ commit }, { deckName, userId }) {
    // console.log(userId);
    return axios
      .post("//localhost:3000/api/decks", { deckName, userId })
      .then((res) => {
        commit("ADD_DECK", res.data);
      });
  },
};
export const getters = {};
