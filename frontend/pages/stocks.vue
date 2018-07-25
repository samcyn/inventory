<template>
  <div class="stocks">
    STOCKS
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  layout: 'admin',
  middleware: 'authenticated',
  components: {
  
  },  
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
