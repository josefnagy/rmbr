<template>
  <nav>
    <ul>
      <li>
        <router-link class="link" active-class="active" to="/" exact
          >Decks</router-link
        >
      </li>
      <li>
        <router-link class="link" active-class="active" to="/settings"
          >Settings</router-link
        >
      </li>
      <li>
        <button class="btn" @click="onLogout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    onLogout() {
      this.$store.dispatch("user/logout");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style lang="scss">
.link {
  color: $black;
  text-decoration: none;
  transition: all 0.2s;
}
.link:hover {
  text-decoration: underline;
  text-decoration-color: $primary;
  text-decoration-thickness: 0.4rem;
  text-underline-offset: 0.5rem;
}
.active {
  text-decoration: underline;
  text-decoration-color: $primary;
  text-decoration-thickness: 0.4rem;
  text-underline-offset: 0.5rem;
}
.btn {
  margin-top: 0 !important;
}
</style>
