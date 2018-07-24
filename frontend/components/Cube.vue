<template>
  <span class="icon is-large">
    <svg class="svg-inline--fa fa-cube fa-w-16 fa-2x" aria-hidden="true" data-prefix="fas" data-icon="cube" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path class="cube" d="M239.1 6.3l-208 78c-18.7 7-31.1 25-31.1 45v225.1c0 18.2 10.3 34.8 26.5 42.9l208 104c13.5 6.8 29.4 6.8 42.9 0l208-104c16.3-8.1 26.5-24.8 26.5-42.9V129.3c0-20-12.4-37.9-31.1-44.9l-208-78C262 2.2 250 2.2 239.1 6.3zM256 68.4l192 72v1.1l-192 78-192-78v-1.1l192-72zm32 356V275.5l160-65v133.9l-160 80z"></path></svg>
    <b class="icon-text">Cubventory</b>
  </span>
</template>

<style scoped lang="scss">
  .icon {
    align-items: center;
    display: inline-flex;
    justify-content: center;
  }
  .svg-inline--fa {
    display: inline-block;
    font-size: 2em;
    height: 1em;
    overflow: visible;
    vertical-align: -.125em;
  }

  .icon-text {
    font-size: 20px;
    padding-left: $spacing;
  }

  .cube{
    fill: $brand-color; 
    animation-name: spinner;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.14, 0.71, 0.29, 0.86);
    transform-origin: center center; 
    // animation-direction: alternate;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    transform-style: preserve-3d;
  }

  @keyframes spinner { 
    10%, 100% { 
      -moz-transform: rotateY(-360deg); 
      -ms-transform: rotateY(-360deg); 
      transform: rotateY(-360deg); 
    } 
  }
</style>

