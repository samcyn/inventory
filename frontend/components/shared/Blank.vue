<template>
  <div class="blank is-flex" v-bind:style="{ minHeight: height }">
    <slot></slot>
  </div>
</template>

<script>
  
export default {
  name: 'Blank',
  props: { height: { type: String, default: '250px' } }
}
</script>

<style lang="scss">
  .blank {
    align-items: center;
    flex-direction: column;
    justify-content: center;
    opacity: 0.45;
  }
</style>