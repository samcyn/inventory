<template>
  <section class="section">
    <div class="container">
      Welcome to Dashboard <b>@{{  loggedUser ? loggedUser.name : 'friend' }}, {{ loggedUser ? loggedUser.email : 'friend' }}</b>
      <p>More Updates soon to come</p>
    </div>
  </section>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
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
