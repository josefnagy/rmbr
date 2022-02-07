import Vue from "vue";
import Router from "vue-router";
import Decks from "@/views/Decks";
import Login from "@/views/Login";

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "decks",
      component: Decks,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

export default router;
