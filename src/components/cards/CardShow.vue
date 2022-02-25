<template>
  <div class="card-wrapper">
    <h2>{{ deckName }}</h2>
    <div class="card-content">This is a very nice question.</div>
    <div class="card-controls">
      <div class="btn-wrapper">
        <span class="time">&lt; 10 min</span>
        <button class="btn btn-secondary">Again</button>
      </div>
      <div class="btn-wrapper">
        <span class="time">&lt; 30 min</span>
        <button class="btn btn-secondary">Hard</button>
      </div>
      <div class="btn-wrapper">
        <span class="time">1 day</span>
        <button class="btn btn-secondary">Good</button>
      </div>
      <div class="btn-wrapper">
        <span class="time">4 days</span>
        <button class="btn btn-secondary">Easy</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["deck"]),
    deckName() {
      return this.deck.decks[this.$route.params.id - 1].name;
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
  margin-bottom: 4rem;
}

.btn-wrapper {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.time {
  font-size: 1.1rem;
  color: $medium-gray;
  margin-bottom: 1rem;
}

.card-wrapper {
  padding-bottom: 15rem;
}

.card-content {
  display: grid;
  place-items: center;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  min-width: 40rem;
  min-height: 30rem;
}
.card-controls {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
}
</style>
