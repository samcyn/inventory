<template>
  <div :class="[navToggle ? 'nav-open' : '' ]">

    <div class="wrapper">
      <!-- event emitter from TheHeader component -->
      <TheHeader @toggleSideBar="toggleSideBar"/>
      <main>
        <nuxt/>
      </main>

    </div>

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
<style lang="scss" scoped>

  main{
    padding-top: $headerHeight; /* exactly height of header */
  }
</style>
