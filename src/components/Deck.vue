<template>
  <div class="deck">
    <!-- <div class="menu-btn-container">
      <button class="menu-btn" @click="showCardMenu = !showCardMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          width="20"
        >
          >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <ul class="deck-menu" v-if="showCardMenu">
        <li class="deck-menu-item">
          <div class="icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          Edit deck
        </li>
        <li class="deck-menu-item">
          <div class="icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          Delete deck
        </li>
      </ul>
    </div> -->
    <template v-if="!deckDone">
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
            {{ `${deck.cardsStudied} of ${deck.cardsToStudy}` }}
          </p>
        </div>
      </div>

      <div class="control">
        <router-link
          class="btn btn-primary btn-view"
          :to="{ name: 'deckStudy', params: { id: deck.id } }"
          >Study</router-link
        >
        <div class="progressBar">
          <div class="bar" :style="{ width: toStudyPercent + '%' }"></div>
        </div>
      </div>
    </template>
    <template v-else
      ><div class="container done">
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
        <h4>{{ deck.name }}</h4>
        <p class="done-copy">You are done for today.</p>
      </div>
    </template>
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
      studiedCards: 0,
      showCardMenu: false,
    };
  },
  computed: {
    deckDone() {
      return this.deck.cardsToStudy === 0 ? true : false;
    },

    toStudyPercent() {
      return (this.deck.cardsStudied / this.deck.cardsToStudy) * 100;
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

.menu-btn-container {
  position: absolute;
  top: 1rem;
  left: 1rem;
}

.icon-wrapper {
  width: 15px;
  display: flex;
}

.menu-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.deck-menu-item {
  background-color: $light-gray;
  padding: 0.7rem 1rem;
  border-bottom: 1px solid $white;
  cursor: pointer;
  display: flex;
  // align-items: center;
  gap: 0.5rem;
}
.deck-menu-item:hover {
  background-color: $white;
}

.done {
  align-items: center;
}

.done-copy {
  margin-left: 2rem;
}

.btn-view {
  padding: 1rem 1.3rem;
  margin-top: 0;
  margin-bottom: 2rem;
  letter-spacing: 1px;
  text-decoration: none;
  font-weight: 400;
  font-size: 1.4rem;
  // width: 3.5rem;
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
  // border-radius: 5px;
  width: 42.5rem;
  height: 12.5rem;
  margin-bottom: 3rem;
  margin-left: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: relative;
}

.doneIcon {
  display: flex;
  align-items: center;
  margin-right: 2rem;
}
</style>
