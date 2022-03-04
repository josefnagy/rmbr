<template>
  <div class="page-wrapper">
    <Header />
    <div class="wrapper">
      <div class="header">
        <h2>{{ deckName }}</h2>
        <button class="btn btn-primary btn-add">+</button>
      </div>
      <div class="decks">
        <div class="deck-picker">
          <ul>
            <li v-for="deck in this.deck.decks" :key="deck.id">
              <router-link
                class="deck-btn"
                :class="deck.id == $route.params.id ? 'active' : ''"
                :to="{ name: 'manageDecks', params: { id: deck.id } }"
                >{{ deck.name }}</router-link
              >
            </li>
          </ul>
        </div>
        <DataGrid :columns="columns" :source="rows" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header";
import DataGrid from "@/components/ui/DataGrid";
import { mapState } from "vuex";

export default {
  components: {
    Header,
    DataGrid,
  },
  data() {
    return {
      isLoading: true,
      columns: [
        { prop: "id", name: "Card ID", size: 100 },
        { prop: "front", name: "Front" },
        { prop: "back", name: "Back" },
      ],
      rows: [],
    };
  },
  methods: {},

  created() {
    this.$store
      .dispatch("deck/getCards", {
        userId: this.user.user.id,
        deckId: this.$route.params.id,
      })
      .then(() => {
        this.isLoading = false;
        this.rows = this.deck.selectedDeck;
      });
  },
  beforeRouteUpdate(to, from, next) {
    this.$store
      .dispatch("deck/getCards", {
        userId: this.user.user.id,
        deckId: to.params.id,
      })
      .then(() => {
        this.isLoading = false;
        this.rows = this.deck.selectedDeck;
        next();
      });
  },
  computed: {
    ...mapState(["deck", "user"]),

    deckName() {
      const deck = this.deck.decks.find(
        (deck) => +deck.id === +this.$route.params.id
      );
      return deck.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.active {
  color: $primary !important;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-add {
  height: 3rem;
  width: 3rem;
  padding: 0.9rem;
  margin-left: 4rem;
}

h2 {
  // margin-top: 2rem;
  text-align: center;
}

.wrapper {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
}

.grid {
  margin-top: 4rem;
}

.decks {
  display: grid;
  grid-template-columns: auto 1fr;
  padding-top: 2rem;
}

.deck-btn {
  text-decoration: none;
  color: $black;
}

.deck-btn:hover {
  color: $primary;
}

.deck-picker {
  display: flex;
  flex-direction: column;
  // justify-content: center;

  ul {
    margin: 0 5rem;
  }

  li {
    padding: 0.5rem 2rem;
    font-weight: 700;
  }
}
</style>
