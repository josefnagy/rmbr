import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store/store";

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
  render: (h) => h(App),
}).$mount("#app");
