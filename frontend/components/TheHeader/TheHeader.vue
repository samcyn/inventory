<template>
  <header>
    <nav class="navbar is-transparent">
    
        <div class="navbar-brand">
          <nuxt-link class="navbar-item has-text-primary" to="/">
            <!--<img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"> -->
            <Cube/>
          </nuxt-link>
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
  import Cube from '../Cube.vue'
  

  export default {
    name: 'TheHeader',
    components: {
      Menus, Cube
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