<template>
  <div class="navbar-end" v-if="isAuthenticated">
    <div class="navbar-item">
      <div class="field is-grouped" >
        <p class="control">
          <a class="button is-primary" href="#">
            <span class="icon">
              <i class="fa fa-user"></i>
            </span>
            <span>Hi, {{loggedUser ? loggedUser.name : 'Friend' }}</span>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  
  //import { unsetUser } from '~/utils/auth';
  
  export default {
    name: 'Menus',
    computed: mapGetters([
      'isAuthenticated',
      'loggedUser'
    ])
  }
</script>

<style lang="scss">
  
</style>