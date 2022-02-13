<template>
  <div class="page-wrapper">
    <Header />
    <div class="wrapper">
      <DecksList v-show="!noDecks" :decks="state.decks"></DecksList>
      <button v-show="!noDecks" class="btn btn-add" @click="onAddDeck">
        +
      </button>
      <div v-if="noDecks" class="content">
        <div class="text-content">
          <h3>No Decks!</h3>
          <p>Let's add some, by using the button bellow.</p>
          <button class="btn btn-add" @click="onAddDeck">+</button>
        </div>

        <div class="img">
          <BackgroundImage />
        </div>
      </div>
    </div>
    <div v-if="isAddDeckOpen" @click.self="close" class="overlay">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header";
import DecksList from "@/components/DecksList";
import BackgroundImage from "@/components/ui/BackgroundImage";

import { store } from "@/store/appStore";

export default {
  name: "Decks",
  components: { Header, BackgroundImage, DecksList },
  data() {
    return {
      showAddDeck: false,
      noDecks: false,
      state: store.state,
    };
  },
  methods: {
    onAddDeck() {
      this.$router.push({ name: "addDeck" });
    },
    close() {
      this.$router.push({ name: "decks" });
    },
  },
  computed: {
    isAddDeckOpen() {
      return this.$route.name === "addDeck";
    },
  },
};
</script>

<style scoped>
.overlay {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.76);
  width: 100%;
  height: 100%;
}

.page-wrapper {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.wrapper {
  height: 100%;
  display: grid;
  place-items: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
.text-content {
  text-align: center;
  margin-bottom: 3rem;
}

h3 {
  margin-bottom: 1rem;
}
</style>
