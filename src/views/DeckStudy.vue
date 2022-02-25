<template>
  <div class="page-wrapper">
    <Header />
    <div class="wrapper">
      <CardShow />
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header";
import CardShow from "@/components/cards/CardShow";
export default {
  components: { Header, CardShow },
  created() {},
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
.wrapper {
  height: 100%;
  display: grid;
  place-items: center;
}
</style>
