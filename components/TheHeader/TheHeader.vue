<template>
  <header>
    <nav class="navbar is-transparent">
      <div class="container">
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

      </div>
    </nav>
  </header>
</template>

<script>
  import { unsetUser } from '~/utils/auth';
  import Menus from './Menus';

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
        this.$emit('toggleSideBar');
      },
      logOut () {
        unsetUser();
        //TODO redirect to home page
        this.$router.push({
          name: 'index'
        });
      }
    }
  }
</script>

<style lang="scss">
  
</style>