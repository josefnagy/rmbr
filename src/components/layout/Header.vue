<template>
  <header>
    <router-link class="logo" to="/">
      <span class="logo-title">rmbr</span>
      <span class="logo-dot"
        ><svg width="17" height="17">
          <rect
            width="17"
            height="17"
            style="fill: rgb(255, 109, 4); stroke-width: 0"
          /></svg
      ></span>
    </router-link>
    <Navbar />
  </header>
</template>

<script>
import Navbar from "@/components/ui/Navbar";
export default {
  name: "Header",
  components: { Navbar },
};
</script>

<style lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    display: flex;
    gap: 1rem;
    font-weight: 600;
  }
}

.logo {
  font-family: $text-heading;
  color: $black;
  text-decoration: none;
  font-size: 7.5rem;
  text-transform: uppercase;
  font-weight: 600;
  .logo-dot {
    margin-left: 0.5rem;
  }
}
</style>
