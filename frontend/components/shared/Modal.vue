<template>
  <div class="modal" v-bind:class="[isActive ? 'is-active' : '']">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <!-- modal content here -->
      <slot></slot>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
  </div>
</template>

<script>
    
  export default {
    name: 'Modal',
    props: { isActive: { type: Boolean, default: false } },
    methods: {
      closeModal () {
        this.$emit('closeModal');
      }
    }
  }
</script>

<style lang="scss">
  
</style>