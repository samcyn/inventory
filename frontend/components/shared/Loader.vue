<template>
  <div class="loader-container" v-bind:style="{position: position, justifyContent: justifyContent }">
    <div class="spinner" v-bind:style="{ width: size, height: size }"></div>
    <br>
    <p>{{text}}</p>
  </div>
</template>

<script>
  export default {
    name: 'loader',
    props:{
      //this props is used to decide sidebar content
      position:{ default: 'absolute' },
      justifyContent: { default: 'center' },
      text: { default: 'Please wait ...' },
      size: { default: '40px'}
    }

  }
</script>

<style scoped lang="scss">
  .loader-container{
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $brand-grey;
    display: flex;
    align-items: center;
    flex-direction: column;
    z-index: 6;
    margin: 0 auto;
  }
  .spinner {
    border: 2px solid #F3F3F3; /* Light grey */
    border-top: 3px solid $brand-color; /* Blue */
    border-radius: 50%;
    animation: spin 0.5s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
