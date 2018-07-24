<template>
  <div class="users">
    <table class="table is-fullwidth is-hoverable is-striped is-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{user.username}}</td>
          <td>{{user.phone_number}}</td>
          <td>{{ user.role }}</td>
          <td>{{user.created_at }}</td>
          <td>View</td>
        </tr>
      </tbody>
    </table>
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
      users: []
    }
  },
  async mounted() {
    try {
      const token = this.$store.state.token;
      const response = await this.$axios.$get('user', {
        headers: { 'Authorization': 'BEARER ' + token }
      });
      this.users = response.payload;
      console.log(this.users);
    } catch(err) {
      console.log({err});
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
