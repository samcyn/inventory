<template>
  <header>
    <nav class="navbar is-white">
    
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
          </a>
          <div class="navbar-burger burger" data-target="navbarExampleTransparentExample" @click="toggleSideBar">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
          <Menus/>
        </div>

      
    </nav>
  </header>
</template>

<script>
  import Menus from '../shared/Menus';

  export default {
    name: 'TheHeader',
    components: {
      Menus
    },
    methods: {
      toggleSideBar () {
        // console.log(this.$router.currentRoute.name);
        if( this.$router.currentRoute.name === 'index'){
          return;
        }
        const navValue = this.$store.getters.isNavOpen;
        this.$store.dispatch('setNavOpen', !navValue);
      }
    }
  }
</script>

<style lang="scss">
  header{
    // height: 54px;
    position: fixed;
    width: 100%;
    z-index: 5;
  }
</style>