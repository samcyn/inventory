<template>
  <header>
    <nav class="navbar is-transparent">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
          </a>
          <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu" v-if="$store.getters.isAuthenticated">
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <a class="button is-primary" href="#" v-on:click="logOut">
                    <span class="icon">
                      <i class="fa fa-user"></i>
                    </span>
                    <span>Log Out</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  import { unsetUser } from '~/utils/auth'

  export default {
    name: 'TheHeader',
     methods: {
      logOut () {
        try {
          unsetUser();
          //TODO redirect to home page
          this.$router.push({
            name: 'index'
          });
        } catch(e){
          console.log(e);
        }
      }
    }
  }
</script>

<style lang="scss">
  
</style>