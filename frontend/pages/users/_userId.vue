<template>
  <div class="users">
    <h1 class="title">User's Card</h1>
    <Card width="400px">
      <div slot="header" class="card-header">
        <h2 class="card-header-title has-text-primary">{{user.username}}</h2>
        <a class="card-header-icon has-text-primary">
          <span class="icon">
            <i class="fa fa-user"></i>
          </span>
        </a>
      </div>
      <div class="content">
        <p><b>Email</b>: {{user.email}}</p>
        <p><b>Phone</b>: {{user.phone_number}}</p>
        <p><b>Role</b>: {{user.role.display_name}}</p>
        <p><b>Role Description</b>: {{user.role.description}}</p>
        <p><b>Member Since</b>: {{user.created_at | moment("from")}}</p>
        <p><b>Last Updated </b>: {{user.updated_at | moment("from")}}</p>
      </div>
      <div slot="footer" class="card-footer">
        <a class="card-footer-item has-text-primary"><i class="fa fa-edit"></i>  <span>Edit</span> </a> 
        <a class="card-footer-item has-text-primary"><i class="fa fa-trash"></i>  <span>Delete</span></a>         
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '~/components/shared/Card.vue'

  export default {
    layout: 'admin',
    middleware: 'authenticated',
    components: {
      Card
    },
    data () {
      return { user: {} }
    },
    async asyncData ({ params, app, store }) {
      const userId = params.userId;
      // get the token
      const token = store.state.token;
      const response = await app.$axios.$get(`user/${userId}`, {
        headers: { 'Authorization' : 'BEARER ' + token }
      });
      return { user: response.payload }
    }
  }
</script>