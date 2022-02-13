<template>
  <ul>
    <li v-for="(deck, index) in decks" :key="index"><Deck :deck="deck" /></li>
  </ul>
</template>

<script>
import Deck from "@/components/Deck";
export default {
  name: "DecksList",
  props: ["decks"],
  components: { Deck },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
ul {
  display: grid;
  grid-template-rows: repeat(4, min-content);
  grid-auto-flow: column;
}
</style>
