<template>
  <div class="navbar-end" v-if="$store.getters.isAuthenticated">
    <a class="navbar-item" href="/">
      Home
    </a>
    <div class="navbar-item">
      <div class="field is-grouped" >
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
</template>

<script>
  import { unsetUser } from '~/utils/auth';
  
  export default {
    name: 'Menus',
    methods: {
      logOut () {
        unsetUser();
        //TODO redirect to home page
        this.$router.push({
          name: 'index'
        });
        this.$emit('toggleSideBar');
      }
    }
  }
</script>

<style lang="scss">
  
</style>