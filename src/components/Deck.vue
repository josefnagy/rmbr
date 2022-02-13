<template>
  <div class="deck">
    <div class="container">
      <div class="doneIcon">
        <svg
          width="69"
          height="69"
          viewBox="0 0 69 69"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="34.5"
            cy="34.5"
            r="32.5"
            fill="#FEFEFE"
            :stroke="deckDone ? primary : gray"
            stroke-width="4"
          />
          <line
            x1="17.8284"
            y1="38"
            x2="32"
            y2="52.1716"
            :stroke="deckDone ? primary : gray"
            stroke-width="4"
            stroke-linecap="round"
          />
          <line
            x1="32.2478"
            y1="52.2734"
            x2="51.2734"
            y2="18.7522"
            :stroke="deckDone ? primary : gray"
            stroke-width="4"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div class="stats">
        <h4>{{ deck.name }}</h4>
        <time>{{ deck.updatedAt }}</time>
        <p class="cards">
          {{ `${deck.totalCards - deck.cardsToStudy} of ${deck.totalCards}` }}
        </p>
      </div>
    </div>

    <div class="control">
      <button class="btn btn-view">></button>
      <div class="progressBar">
        <div class="bar" :style="{ width: toStudyPercent + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Deck",
  props: ["deck"],
  data() {
    return {
      gray: "#9F9F9F",
      primary: "#ff6d04",
    };
  },
  computed: {
    deckDone() {
      return this.deck.cardsToStudy === 0 ? true : false;
    },
    toStudyPercent() {
      const studiedCards = this.deck.totalCards - this.deck.cardsToStudy;
      return (studiedCards / this.deck.totalCards) * 100;
    },
  },
};
</script>

<style lang="scss" scoped>
h4 {
  font-size: 2rem;
}
time {
  font-size: 1.3rem;
  color: $light-gray;
}

.btn-view {
  padding: 1rem 1.3rem;
  margin-top: 0;
  margin-bottom: 2rem;
  width: 3.5rem;
}

.control {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  .progressBar {
    height: 6px;
    width: 100%;
    max-width: 20rem;
    background-color: $black;
    align-self: flex-end;
  }
  .bar {
    height: 6px;
    // width: 100%;
    background-color: $primary;
  }
}
.container {
  display: flex;
}
.stats {
  .cards {
    font-size: 1.3rem;
    margin-top: 1rem;
  }
}
.deck {
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  width: 42.5rem;
  height: 12.5rem;
  margin-bottom: 3rem;
  margin-left: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
}

.doneIcon {
  display: flex;
  align-items: center;
  margin-right: 2rem;
}
</style>
