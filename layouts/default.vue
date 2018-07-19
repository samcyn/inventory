<template>
  <div class="wrapper">
    <TheHeader/>
    <main>
      <nuxt/>
    </main>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader/TheHeader.vue'

export default {
  components: {
    TheHeader
  }
}
</script>
<style>

</style>
