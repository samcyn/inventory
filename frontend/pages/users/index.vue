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
      <div v-else>
        <DataTable :head="tableHeading">
          <tr v-for="user in users" :key="user._id">
            <td >{{user.username}}</td>
            <td>{{user.phone_number}}</td>
            <td>{{ user.role ? user.role.display_name : 'user' }}</td>
            <td>{{user.created_at  | moment("dddd, MMMM Do YYYY") }}</td>
            <td><nuxt-link class="has-text-primary" :to="{ name: 'users-userId', params: { userId: user._id }}">View</nuxt-link></td> 
          </tr>
        </DataTable>
        <!-- show pagination -->
        <Pagination @filterTable="filterTable" :page="tableData.page" :limit="tableData.limit" :count="count"/>
      </div>
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

import DataTable from '~/components/shared/DataTable.vue'
import Modal from '~/components/shared/Modal.vue'
import Card from '~/components/shared/Card.vue'
import Blank from '~/components/shared/Blank.vue'
import Loader from '~/components/shared/Loader.vue'
import Pagination from '~/components/shared/Pagination.vue'


export default {
  layout: 'admin',
  middleware: 'authenticated', 
  components: {
    DataTable, Modal, Card, Blank, Loader, Pagination
  },
  data () {
    return {
      tableHeading: ['Name', 'Phone', 'Role', 'Date', 'Action'],
      users: [],
      roles: [],
      isActive: false,
      formData: {},
      isLoading: false,
      count: 0,
      tableData : {
        page: 1,
        limit: 10
      },
      error: null
    }
  },
  async mounted() {
    try {
      //show loader
      this.isLoading = true;

      //get all users
     // this.getUsers();
      const token = this.$store.state.token;
      const page = this.tableData.page;
      const limit = this.tableData.limit;
      const response = await this.$axios.$get('user', {
        headers: { 'Authorization': 'BEARER ' + token },
        params : { page: page, limit: limit }
      });

    
      const roleResponse = await this.$axios.$get('user/get/roles', {
        headers: { 'Authorization': 'BEARER ' + token }
      });

      this.users = response.payload.users;
      //get total  number of users
      this.count = response.payload.total;
      this.roles = roleResponse.payload;
      console.log(response);
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
    async getUsers () {
      const token = this.$store.state.token;
      const page = this.tableData.page;
      const limit = this.tableData.limit;
      const response = await this.$axios.$get('user', {
        headers: { 'Authorization': 'BEARER ' + token },
        params : { page: page, limit: limit }
      });
      this.users = response.payload.users;
      //get total  number of users
      this.count = response.payload.total;      
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
        if(this.tableData.page === 1){
          this.users.unshift(response.payload);
        }

        //reset form 
        this.formData = {};

        //close modal
        this.isActive = false;
      } 
      catch (err) {
        console.log(err.response.data.responseText);
        this.error = err.response.data.responseText;
      }
    },
    filterTable (value) {
      if (value === 'prev') {
        if(this.tableData.page !== 1){
          this.tableData.page--
        }
      }
      else if (value === 'next') {
        this.tableData.page++
      }
      else {
        this.tableData.page = value;
      }
      this.getUsers();
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
    }
  }
}
</script>

<style scoped>
  .users__info{
    position: relative;
    min-height: 70vh;
  }

   @media 
  only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
    td:nth-of-type(1):before { content: "Name"; font-weight: bold; }
    td:nth-of-type(2):before { content: "Phone"; font-weight: bold; }
    td:nth-of-type(3):before { content: "Role"; font-weight: bold; }
    td:nth-of-type(4):before { content: "Date"; font-weight: bold; }
    td:nth-of-type(5):before { content: "Action"; font-weight: bold; }
  }
</style>
