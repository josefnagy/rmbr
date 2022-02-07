<template>
  <div class="modal">
    <div class="wrapper">
      <h4>{{ heading }}</h4>
      <p class="content"><slot></slot></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["heading"],
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.wrapper {
  background-color: $white;
  border-radius: 1rem;
  padding: 1.5rem 4rem;
  color: $black;
  border: 1px solid $black;
}

.content {
  margin-top: 2rem;
}
</style>
