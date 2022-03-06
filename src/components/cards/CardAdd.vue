<template>
  <Modal heading="Add Card" :close="onClose">
    <div class="addDeck">
      <Editor v-model="content" />
      <button class="btn btn-primary modal-btn" @click="onAddCard">
        Add Card
      </button>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/ui/Modal";
import Editor from "@/components/ui/Editor";
export default {
  components: {
    Modal,
    Editor,
  },
  data() {
    return {
      content: {},
    };
  },
  methods: {
    onAddCard() {
      console.log(this.content);
      // this.$store.dispatch("deck/addDeck", {
      //   deckName: this.deckName,
      //   userId: this.$store.state.user.user.id,
      // });
      // this.$router.push({ name: "decks" });
    },
    onClose() {
      this.$router.push({ name: "manageDecks" });
    },
  },
};
</script>

<style lang="scss" scoped>
.addDeck {
  display: flex;
  flex-direction: column;
  min-width: 50rem;
  min-height: 50rem;
}

.modal-btn {
  margin-top: 2rem !important;
}
</style>
