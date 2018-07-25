<template>
  <div class="users">
    <div class="users__add is-clearfix">
      <button class="button is-primary is-pulled-right" @click="openModal">Add User</button>
    </div>
    <br/>
    <DataTable :head="tableHeading" :users="users"/>

    <Modal :isActive="isActive" @closeModal="closeModal">
      <Card width="400px">
        <form @submit.prevent="addUser">
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input class="input is-black" type="text" placeholder="Username" required v-model="formData.username">
            </div>
          </div>

          <div class="field">
            <label class="label">Phone</label>
            <div class="control">
              <input class="input is-black" type="phone" placeholder="Phone Number" required v-model="formData.phone_number">
            </div>
            <p class="help is-danger">This number is wrong</p>
          </div>

          <div class="field">
            <label class="label">Email Address</label>
            <div class="control">
              <input class="input is-black" type="text" placeholder="Email Address" required v-model="formData.email">
            </div>
            <p class="help is-danger">This username is unavailable</p>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input is-black" type="text" placeholder="Password" required v-model="formData.password">
            </div>
            <p class="help is-danger">This username is unavailable</p>
          </div>
         
          <div class="field">
            <label class="label">Role</label>
            <div class="control">
              <div class="select is-black is-fullwidth">
                <select v-model="formData.role">
                  <option v-for="role in roles" :key="role._id" :value="role._id">{{ role.display_name}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button type="submit" class="button is-primary">Submit</button>
            </div>
          </div>

         
        </form>
      </Card>
    </Modal>

  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import DataTable from '~/components/shared/DataTable.vue'
import Modal from '~/components/shared/Modal.vue'
import Card from '~/components/shared/Card.vue'


export default {
  layout: 'admin',
  middleware: 'authenticated', 
  components: {
    DataTable, Modal, Card
  },
  data () {
    return {
      tableHeading: ['Name', 'Phone', 'Role', 'Date', 'Action'],
      users: [],
      roles: [],
      isActive: false,
      formData: {}
    }
  },
  async mounted() {
    try {
      const token = this.$store.state.token;
      const response = await this.$axios.$get('user', {
        headers: { 'Authorization': 'BEARER ' + token }
      });
      const roleResponse = await this.$axios.$get('user/get/roles', {
        headers: { 'Authorization': 'BEARER ' + token }
      });
      this.users = response.payload;
      this.roles = roleResponse.payload;
      //console.log("ROLES", this.roles, this.users);
    } catch(err) {
      console.log({err});
    }
  },
  methods: {
    closeModal () {
      this.isActive = false;
    },
    openModal () {
      this.isActive = true;
    },
    async addUser () {
      try {
        // get the token
        const token = this.$store.state.token;
        // get user datat
        const user = this.formData;
        // post form 
        const response = await this.$axios.$post('user', { user },  {
          headers: { 'Authorization' : 'BEARER ' + token }
        });
        console.log(response.payload);
        // add new user to users arrays
        this.users.unshift(response.payload);

        //close modal
        this.isActive = false;
      } 
      catch (err) {
        console.log({err});
      }
    }
  },
  computed: mapGetters([
    'isAuthenticated',
    'loggedUser'
  ])
}
</script>

<style scoped>
  
</style>
