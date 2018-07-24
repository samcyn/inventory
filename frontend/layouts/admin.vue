<template>
  <div :class="[isNavOpen ? 'nav-open' : '' ]">

    <div class="wrapper">
      <!-- event emitter from TheHeader component -->
      <TheHeader/>

      <main>
        <TheSidebar position="aside__left" :showNavbarLinks="false"/>
        <section class="main-section">
          <nuxt/>
        </section>
      </main>

    </div>
    <!--sidebar for mobile screen -->
    <TheSidebar position="aside__right" :showNavbarLinks="false"/>

    <!-- show body ovelay only when nav is open -->
    <BodyOverlay v-if="isNavOpen"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TheHeader from '~/components/TheHeader/TheHeader.vue'
import TheSidebar from '~/components/TheSidebar/TheSidebar.vue'
import BodyOverlay from '~/components/BodyOverlay'

export default {
  components: {
    TheHeader,
    TheSidebar,
    BodyOverlay
  },
  computed: mapGetters([
    'isNavOpen'
  ])
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
      padding: $spacing * 2 $spacing;
      width: 100%;
    }
  }
</style>
