import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store/store";
import axios from "axios";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import "@fontsource/archivo/variable-full.css";

/* eslint-disable no-unused-vars */
import styles from "@/styles/styles.scss";
/* eslint-enable no-unused-vars */

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  created() {
    const userString = localStorage.getItem("user");
    const decksString = localStorage.getItem("decks");
    if (userString) {
      const userData = JSON.parse(userString);
      const decksData = JSON.parse(decksString);
      this.$store.commit("user/SET_USER_DATA", userData);
      this.$store.commit("deck/SET_DECKS_DATA", decksData);
    }
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
  },
  render: (h) => h(App),
}).$mount("#app");
