import Vue from "vue";
import Router from "vue-router";
import Decks from "@/views/Decks";
import Login from "@/views/Login";
import AddDeck from "@/components/layout/AddDeck";

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  mode: "history",
  routes: [
    {
      path: "/",
      name: "decks",
      component: Decks,
      children: [
        {
          path: "decks/add",
          name: "addDeck",
          component: AddDeck,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

export default router;
