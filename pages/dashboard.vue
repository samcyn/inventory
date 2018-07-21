<template>
  <section class="section">
    <div class="container">
      Welcome to Dashboard <b>@{{$store.getters.loggedUser.name.toUpperCase()}}, {{$store.getters.loggedUser.email}}</b>
      <p>More Updates soon to come</p>
    </div>
  </section>
</template>

<script>


export default {
  middleware: 'authenticated',  
  data () {
    return {
     
    }
  },
  methods: {
   
  }
}
</script>

<style scoped>
  
</style>
