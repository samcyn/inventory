<template>
  <div class="categories">
   CATEGORIES
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  layout: 'admin',
  middleware: 'authenticated',  
  data () {
    return {
     
    }
  },
  methods: {
   
  },
  computed: mapGetters([
    'isAuthenticated',
    'loggedUser'
  ])
}
</script>

<style scoped>
  
</style>
