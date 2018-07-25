<template>
  <div class="users">
    <div class="users__add is-clearfix">
      <button class="button is-primary is-pulled-right" @click="openModal">Add User</button>
    </div>
    <br/>
    <div class="users__info">
      <!-- Show blank if no users -->
      <Blank :height="'70vh'" v-if="users.length === 0">
        <i class="fa fa-signal fa-4x"></i>
        <p>No Users Data</p>
      </Blank>
      <!-- display users info -->
      <DataTable :head="tableHeading" :users="users" v-else/>
      <!-- show loader when fetching users, hide loader when done -->
      <Loader v-if="isLoading"/>
    </div>

    <Modal :isActive="isActive" @closeModal="closeModal">
      <Card width="400px">
        <form @submit.prevent="addUser($event)">
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input class="input is-black" type="text" placeholder="Username" v-model="formData.username" required>
            </div>
          </div>

          <div class="field">
            <label class="label">Phone</label>
            <div class="control">
              <input class="input is-black" type="number" placeholder="Phone Number" v-model="formData.phone_number" required>
            </div>
            <p class="help is-danger" v-if="errorCode === 0 ">This number is already in use</p>
          </div>

          <div class="field">
            <label class="label">Email Address</label>
            <div class="control">
              <input class="input is-black" type="email" placeholder="Email Address" v-model="formData.email" required>
            </div>
            <p class="help is-danger" v-if="errorCode === 1">This email is already in use</p>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input is-black" type="password" placeholder="Password" v-model="formData.password" required>
            </div>
            <p class="help is-danger" v-if="errorCode === 2">password must be at least 6 digits and less than 50 digits</p>
          </div>
         
          <div class="field">
            <label class="label">Role</label>
            <div class="control">
              <div class="select is-black is-fullwidth">
                <select v-model="formData.role" required>
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
import Blank from '~/components/shared/Blank.vue'
import Loader from '~/components/shared/Loader.vue'


export default {
  layout: 'admin',
  middleware: 'authenticated', 
  components: {
    DataTable, Modal, Card, Blank, Loader
  },
  data () {
    return {
      tableHeading: ['Name', 'Phone', 'Role', 'Date', 'Action'],
      users: [],
      roles: [],
      isActive: false,
      formData: {},
      isLoading: false,
      error: null
    }
  },
  async mounted() {
    try {
      //show loader
      this.isLoading = true;
      const token = this.$store.state.token;
      const response = await this.$axios.$get('user', {
        headers: { 'Authorization': 'BEARER ' + token }
      });
      const roleResponse = await this.$axios.$get('user/get/roles', {
        headers: { 'Authorization': 'BEARER ' + token }
      });
      this.users = response.payload;
      this.roles = roleResponse.payload;
      //hide loader
      this.isLoading = false;
      //console.log("ROLES", this.roles, this.users);
    } catch(err) {
      console.log({err});
      //hide load also
      this.isLoading = false;
    }
  },
  methods: {
    closeModal () {
      this.isActive = false;
    },
    openModal () {
      this.isActive = true;
    },
    async addUser (event) {
      try {
        // get the token
        const token = this.$store.state.token;
        // get user datat
        const user = this.formData;
        // post form 
        const response = await this.$axios.$post('user', { user }, {
          headers: { 'Authorization' : 'BEARER ' + token }
        });
        console.log(response.payload);
        // add new user to users arrays
        this.users.unshift(response.payload);

        //reset form 
        this.formData = {};

        //close modal
        this.isActive = false;
      } 
      catch (err) {
        console.log(err.response.data.responseText);
        this.error = err.response.data.responseText;
      }
    }
  },
  computed: {
    errorCode () {
      const err = this.error;
      if (!err) {
        return;
      }
      const errArray = err.split(' ');
      if (errArray.includes('duplicate') && errArray.includes('dentdb.users.$phone_number_1')) {
        return 0;
      }
      else if (errArray.includes('duplicate') && errArray.includes('dentdb.users.$email_1')) {
        return 1;
      }
      else if (errArray.includes('password')) {
        return 2;
      }
      // switch () {

      // }
      //return '';
    }
  }
}
</script>

<style scoped>
  .users__info{
    position: relative;
    min-height: 70vh;
  }
</style>
