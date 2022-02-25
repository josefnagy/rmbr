<template>
  <Modal heading="Add Deck...">
    <div class="addDeck">
      <input
        type="text"
        class="textInput"
        v-model.lazy="deckName"
        placeholder="Deck name"
      />
      <button class="btn btn-primary modal-btn" @click="onAddDeck">
        Add Deck
      </button>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/ui/Modal";
export default {
  components: {
    Modal,
  },
  data() {
    return {
      deckName: "",
    };
  },
  methods: {
    onAddDeck() {
      this.$store.dispatch("deck/addDeck", {
        deckName: this.deckName,
        userId: this.$store.state.user.user.id,
      });
      this.$router.push({ name: "decks" });
    },
  },
};
</script>

<style lang="scss" scoped>
.addDeck {
  display: flex;
  flex-direction: column;
}

.modal-btn {
  margin-top: 2rem !important;
}
</style>
