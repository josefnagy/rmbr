<template>
  <div class="page-wrapper">
    <Header />
    <div class="wrapper" v-if="!isLoading">
      <DecksList v-show="!noDecks" :decks="deck.decks"></DecksList>
      <button
        v-show="!noDecks"
        class="btn btn-primary btn-add"
        @click="onAddDeck"
      >
        +
      </button>
      <div v-if="noDecks" class="content">
        <div class="text-content">
          <h3>No Decks!</h3>
          <p>Let's add some, by using the button bellow.</p>
          <button class="btn btn-primary btn-add" @click="onAddDeck">+</button>
        </div>

        <div class="img">
          <BackgroundImage />
        </div>
      </div>
    </div>
    <p v-else>Loading ...</p>
    <div v-if="isAddDeckOpen" @click.self="close" class="overlay">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header";
import DecksList from "@/components/DecksList";
import BackgroundImage from "@/components/ui/BackgroundImage";

import dayjs from "dayjs";

import { mapState } from "vuex";

export default {
  name: "Decks",
  components: { Header, BackgroundImage, DecksList },
  data() {
    return {
      showAddDeck: false,
      isLoading: true,
    };
  },
  created() {
    this.$store.dispatch("deck/getDecks", this.user.user.id);
    this.isLoading = false;
    console.log(dayjs(Date.now()).toISOString());
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
    noDecks() {
      return this.$store.state.deck.decks === 0;
    },
    ...mapState(["deck", "user"]),
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

.btn-add {
  margin-top: 2rem !important;
}

h3 {
  margin-bottom: 1rem;
}
</style>
