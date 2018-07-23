<template>
  <aside :class="position">
    <div class="file is-boxed">
      <label class="file-label">
        <input class="file-input" type="file" name="resume">
        <span class="file-cta">
          <span class="file-icon">
            <img src="http://www.colegioexpressao.com/assets/images/avatar-2.png"/>
          </span>
          <span class="file-label has-text-white">
            {{ loggedUser ? loggedUser.name : 'Friend'}}
          </span>
        </span>
      </label>
    </div>
    <ul class="aside__menuList">
      <li class="aside__items">
        <nuxt-link class="aside__links is-flex" :to="{ name: 'dashboard' }">
          <i class="icon-grid aside__icons"></i>
          <p class="aside__text">Dashboard</p>
        </nuxt-link>
      </li>
      <li class="aside__items">
        <nuxt-link class="aside__links is-flex" :to="{ name: 'categories' }">
          <i class="icon-organization aside__icons"></i>
          <p class="aside__text">Categories</p>
        </nuxt-link>
      </li>
      <li class="aside__items">
        <nuxt-link class="aside__links is-flex" :to="{ name: 'stocks' }">
          <i class="icon-bag aside__icons"></i>
          <p class="aside__text">Stocks</p>
        </nuxt-link>
      </li>
      <li class="aside__items">
        <nuxt-link class="aside__links is-flex" :to="{ name: 'sales' }">
          <i class="icon-chart aside__icons"></i>
          <p class="aside__text">Sales</p>
        </nuxt-link>
      </li>
      <li class="aside__items">
        <nuxt-link class="aside__links is-flex" :to="{ name: 'users' }">
          <i class="icon-user aside__icons"></i>
          <p class="aside__text">Users</p>
        </nuxt-link>
      </li>
    </ul>
    <Menus @toggleSideBar="toggleSideBar" v-if="showNavbarLinks"/>

    <div class="aside__footer">
      <a class="button is-primary is-fullwidth is-radiusless" v-on:click="logOut">
        <span class="icon">
          <i class="icon-logout"></i>
        </span>
        <span>Log Out</span>
      </a>
    </div>

  </aside>
</template>

<script>
import Menus from '../shared/Menus';
import { unsetUser } from '~/utils/auth';
import { mapGetters } from 'vuex';


export default {
  
  name: 'TheSidebar',
  components: {
    Menus
  },
  props: {
    position: { type: String, required: true },
    showNavbarLinks: {type: Boolean, required: true }
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
      this.$emit('toggleSideBar');
    }
  },
  computed: mapGetters([
    'loggedUser'
  ])
}
</script>
<style scoped lang="scss">
  .aside__right, .aside__left{
    width: $sideBarWidth;
    position: fixed; 
    background: #FFF;
  }

  .aside__left{
    border-right: 1px solid $brand-grey;
    height: calc(100% - #{$headerHeight});
  }

  .aside__right{
    top: 0;
    right: 0;
    height: 100%;
    display: none;
    border-left: 1px solid $brand-grey;    
  }

  @media(max-width: 1024px){
    .aside__right {
      display: block;
    }
    .aside__left {
      display: none;
    }
  }
  .file-cta {
    border: 0 !important;
  }

  .file-label {
    margin: 0 auto;
    text-align: center;
    width: 100%;
  }

  .file-icon {
    height: 120px !important;
    width: 120px !important;
  }

  .aside__menuList {
    padding: $spacing;
  }

  .aside__links {
    color: #222;
    display: block;
    padding: $spacing;
    &:hover{
      background: $brand-grey;
    }
    &.is-active{
      background: $brand-color;
      color: #FFF;
      font-weight: 700;
    }
  }

  .aside__text {
    align-self: center;
    padding-left: $spacing;
  }

  .aside__icons {
    // padding: $spacing 0;
    align-self: center;
    text-align: center;
  }

  .aside__footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }


 

</style>

