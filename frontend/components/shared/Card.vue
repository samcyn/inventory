<template>
  <div class="card" v-bind:style="{ maxWidth: width }">
    <slot name="header"></slot>
    <div class="card-content">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
  
export default {
  name: 'Card',
  props: { width: { type: String, default: '100%' } }
}
</script>

<style lang="scss">
  .card {
    margin: 0 auto;
  }
</style>