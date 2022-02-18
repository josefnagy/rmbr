import Vue from "vue";
import Router from "vue-router";
import Decks from "@/views/Decks";
import LoginUser from "@/views/LoginUser";
import RegisterUser from "@/views/RegisterUser";
import AddDeck from "@/components/layout/AddDeck";

Vue.use(Router);

export const router = new Router({
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
      component: LoginUser,
    },
    {
      path: "/register",
      name: "registerUser",
      component: RegisterUser,
    },
  ],
});

export default router;
