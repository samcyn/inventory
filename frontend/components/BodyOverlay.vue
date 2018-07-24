<template>
  <div class="body__overlay" @click="clickHandler"></div>
</template>
<script>
//use BodyOverlay to toggle navOpen as well
export default {
  name: 'BodyOverlay',
  methods: {
    clickHandler () {
      const navValue = this.$store.getters.isNavOpen;
      this.$store.dispatch('setNavOpen', !navValue);
    }
  }
}
</script>
<style>
  .body__overlay {
    position: fixed;
    width: calc(100% - 250px);
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 7;
  }
</style>