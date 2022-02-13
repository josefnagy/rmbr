<template>
  <Modal heading="Add Deck...">
    <div class="addDeck">
      <input type="text" class="textInput" placeholder="Deck name" />
      <button class="btn">Add Deck</button>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/ui/Modal";
export default {
  components: {
    Modal,
  },
};
</script>

<style lang="scss" scoped>
.addDeck {
  display: flex;
  flex-direction: column;
}
</style>
