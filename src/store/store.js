import Vue from "vue";
import Vuex from "vuex";

import * as deck from "@/store/modules/deck";
import * as user from "@/store/modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { deck, user },
  state: {},
});
