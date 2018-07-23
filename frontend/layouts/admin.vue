<template>
  <div :class="[navToggle ? 'nav-open' : '' ]">

    <div class="wrapper">
      <!-- event emitter from TheHeader component -->
      <TheHeader @toggleSideBar="toggleSideBar"/>

      <main>
        <TheSidebar position="aside__left" :showNavbarLinks="false"/>
        <section class="main-section">
          <nuxt/>
        </section>
      </main>

    </div>
    <!--sidebar for mobile screen -->
    <TheSidebar @toggleSideBar="toggleSideBar" position="aside__right" :showNavbarLinks="false"/>
     

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
      navToggle: false
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
<style lang="scss" scoped>
  html, body{
    height: auto;
  }

  .wrapper{
    position: relative;
    transition: 0.33s all cubic-bezier(0.64, 0.43, 0.25, 1);
    // transform: translateX(0);
    z-index: 6;
    background: $brand-grey; //#FFF;
    min-height: 100vh;
  }

  main{
    padding-top: $headerHeight; /* exactly height of header */
  }

  .main-section{
    width: calc(100% - #{$sideBarWidth});
    margin-left: auto;
    padding: $spacing * 2;
  }

  @media(max-width: 1024px){
    .nav-open .wrapper{
      transform: translateX(-#{$sideBarWidth});
    }
    .main-section {
      width: 100%;
    }
  }
</style>
