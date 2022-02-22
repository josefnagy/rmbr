import axios from "axios";

export const namespaced = true;

export const state = {
  user: null,
};

export const mutations = {
  SET_USER_DATA(state, userData) {
    state.user = userData;
    localStorage.setItem("user", JSON.stringify(userData));
    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  },

  CLEAR_USER_DATA() {
    state.user = null;
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = null;

    // location.reload();
    // console.log("qq");
  },
};

export const actions = {
  register({ commit }, credentials) {
    return axios
      .post("//localhost:3000/api/register", credentials)
      .then(({ data }) => {
        commit("SET_USER_DATA", data);
        // router.push({ name: "decks" });
      });
  },

  login({ commit }, credentials) {
    return axios
      .post("//localhost:3000/api/login", credentials)
      .then(({ data }) => {
        commit("SET_USER_DATA", data);
      });
  },

  logout({ commit }) {
    commit("CLEAR_USER_DATA");
  },
};

export const getters = {
  loggedIn(state) {
    return !!state.user;
  },
};
