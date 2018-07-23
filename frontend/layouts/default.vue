<template>
  <div :class="[navToggle ? 'nav-open' : '' ]">

    <div class="wrapper">
      <!-- event emitter from TheHeader component -->
      <TheHeader @toggleSideBar="toggleSideBar"/>
      <main>
        <nuxt/>
      </main>

    </div>
    <!--sidebar for mobile screen -->
    <TheSidebar @toggleSideBar="toggleSideBar"/>
     

  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader/TheHeader.vue'
import TheSidebar from '~/components/TheSidebar/TheSidebar.vue'


export default {
  components: {
    TheHeader,
    TheSidebar
  },
  data () {
    return {
      navToggle: false,
      sidebarContent: ""
    }
  },
  methods: {
    toggleSideBar (arg) {
      //arg is the navbar component as a whole
      this.navToggle = !this.navToggle;
    }
  }
}
</script>
<style lang="scss">

  @media (max-width: 1024px){
    .wrapper {
        -webkit-transform: translate3d(0px, 0, 0);
        -moz-transform: translate3d(0px, 0, 0);
        -o-transform: translate3d(0px, 0, 0);
        -ms-transform: translate3d(0px, 0, 0);
        transform: translate3d(0px, 0, 0);
        -webkit-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
        -moz-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
        -o-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
        -ms-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
        transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
        position: relative;
    }

    .nav-open .wrapper {
      left: 0;
      -webkit-transform: translate3d(-#{$sideBarWidth}, 0, 0);
      -moz-transform: translate3d(-#{$sideBarWidth}, 0, 0);
      -o-transform: translate3d(-#{$sideBarWidth}, 0, 0);
      -ms-transform: translate3d(-#{$sideBarWidth}, 0, 0);
      transform: translate3d(-#{$sideBarWidth}, 0, 0);
    }
  }
</style>
