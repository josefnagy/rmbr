<template>
  <div class="page-wrapper">
    <Header />
    <div class="wrapper">
      <DecksList v-show="!noDecks" :decks="state.decks"></DecksList>
      <button
        v-show="!noDecks"
        class="btn btn-add"
        @click="showAddDeck = !showAddDeck"
        ref="btn"
      >
        +
      </button>
      <div v-show="noDecks" class="content">
        <div class="text-content">
          <h3>No Decks!</h3>
          <p>Let's add some, by using the button bellow.</p>
          <button
            class="btn btn-add"
            @click="showAddDeck = !showAddDeck"
            ref="btn"
          >
            +
          </button>
        </div>
        <Portal v-if="showAddDeck">
          <Modal
            heading="Add Deck..."
            v-closable="{
              exclude: ['btn'],
              handler: 'onClose',
            }"
          >
            <div class="addDeck">
              <input type="text" class="textInput" placeholder="Deck name" />
              <button class="btn">Add Deck</button>
            </div>
          </Modal>
        </Portal>
        <div class="img">
          <BackgroundImage />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header";
import DecksList from "@/components/DecksList";
import BackgroundImage from "@/components/ui/BackgroundImage";
import Modal from "@/components/ui/Modal";
import { store } from "@/store/appStore";
import { Portal } from "@linusborg/vue-simple-portal";

export default {
  name: "Decks",
  components: { Header, BackgroundImage, Portal, Modal, DecksList },
  data() {
    return {
      showAddDeck: false,
      noDecks: false,
      state: store.state,
    };
  },
  methods: {
    onClose() {
      this.showAddDeck = false;
    },
    onAddDeck() {
      this.showAddDeck = false;
    },
  },
};
</script>

<style scoped>
.addDeck {
  display: flex;
  flex-direction: column;
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
