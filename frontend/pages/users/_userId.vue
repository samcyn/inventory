<template>
  <div class="users">
    <h1 class="title">User's Card</h1>
    <div class="users__info">
      <!-- Display blank if no user parameters -->
      <Blank :height="'70vh'" v-if="userExist">
        <i class="fa fa-signal fa-4x"></i>
        <p>User not Found</p>
      </Blank>
      <!--Users card -->
      <Card width="400px" v-else>
        <div slot="header" class="card-header">
          <h2 class="card-header-title has-text-primary">{{user.username}}</h2>
          <a class="card-header-icon has-text-primary">
            <span class="icon">
              <i class="icon-user"></i>
            </span>
          </a>
        </div>
        <div class="content">
          <p><b>Email</b>: {{user.email}}</p>
          <p><b>Phone</b>: {{user.phone_number}}</p>
          <p><b>Role</b>: {{user.role ? user.role.display_name : '' }}</p>
          <p><b>Role Description</b>: {{ user.role ? user.role.description : '' }}</p>
          <p><b>Member Since</b>: {{ user.created_at | moment("from") || '' }}</p>
          <p><b>Last Updated </b>: {{ user.updated_at | moment("from") || '' }}</p>
        </div>
        <div slot="footer" class="card-footer">
          <a class="card-footer-item has-text-primary" @click="openModal"><i class="icon-pencil"></i> <span>Edit</span> </a> 
          <a class="card-footer-item has-text-primary" @click="deleteUser(user._id)"><i class="icon-trash"></i>  <span>Delete</span></a>         
        </div>
      </Card>
      <!-- show loader when fetching user, hide loader when done -->
      <Loader v-if="isLoading"/>
    </div>
    <!-- Modal to edit user -->
    <Modal :isActive="modalIsActive" @closeModal="closeModal" v-if="!userExist">
      <Card width="400px">
        <form @submit.prevent="editUser($event, user._id)">
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input class="input is-black" type="text" placeholder="Username" v-model="user.username" required>
            </div>
          </div>

          <div class="field">
            <label class="label">Phone</label>
            <div class="control">
              <input class="input is-black" type="number" placeholder="Phone Number" v-model="user.phone_number" required>
            </div>
            <p class="help is-danger" v-if="errorCode === 0 ">This number is already in use</p>
          </div>

          <div class="field">
            <label class="label">Email Address</label>
            <div class="control">
              <input class="input is-black" type="email" placeholder="Email Address" v-model="user.email" required>
            </div>
            <p class="help is-danger" v-if="errorCode === 1">This email is already in use</p>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input is-black" type="password" placeholder="Password" v-model="user.password" required>
            </div>
            <p class="help is-danger" v-if="errorCode === 2">password must be at least 6 digits and less than 50 digits</p>
          </div>
         
          <div class="field">
            <label class="label">Role</label>
            <div class="control">
              <div class="select is-black is-fullwidth">
                <select v-model="user.role._id" required>
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
  import Card from '~/components/shared/Card.vue'
  import Blank from '~/components/shared/Blank.vue'
  import Loader from '~/components/shared/Loader.vue'
  import Modal from '~/components/shared/Modal.vue'


  export default {
    layout: 'admin',
    middleware: 'authenticated',
    components: {
      Card, Blank, Loader, Modal
    },
    data () {
      return { 
        user: {},
        roles: [],
        isLoading: true,
        modalIsActive: false,
        error: null
      }
    },
    async asyncData ({ params, app, store }) {
      try {
        const userId = params.userId;
        // get the token
        const token = store.state.token;
        const response = await app.$axios.$get(`user/${userId}`, {
          headers: { 'Authorization' : 'BEARER ' + token }
        });
        
        const roleResponse = await app.$axios.$get('user/get/roles', {
          headers: { 'Authorization': 'BEARER ' + token }
        });
        return { 
          user: response.payload,
          roles: roleResponse.payload,
          isLoading: false 
        };
      }
      catch(err){
        console.log({err});
        return { isLoading: false }
      }
    },
    methods: {
      openModal () {
        this.modalIsActive = true;
      },
      closeModal () {
        this.modalIsActive = false;
      },
      async editUser (event , userId) {
        console.log("roles", this.user);
        try {
          // get the token
          const token = this.$store.state.token;
          const user = {
            username: this.user.username,
            email: this.user.email,
            password: this.user.password,
            role: this.user.role._id,
            phone_number: this.user.phone_number
          }
          const response = await this.$axios.$put(`user/${userId}`, { user }, {
            headers: { 'Authorization' : 'BEARER ' + token }
          });
        } 
        catch (err) {
          console.log({err});
        }
      },
      async deleteUser (userId) {
        const _confirm = window.confirm('Are you sure about this?');
        if(!_confirm) {
          return;
        }
        try {
          // get the token
          const token = this.$store.state.token;
          const response = await this.$axios.$delete(`user/${userId}`, {
            headers: { 'Authorization' : 'BEARER ' + token }
          });
          //redirect to users pages
          this.$router.push({
            name: 'users'
          });
        }
        catch (err) {
          console.log({err});
        }
      }
    },
    computed: {
      userExist() {
        return !Object.keys(this.user).length
      },
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
  }
  .card-header-title{
    text-transform: uppercase;
  }
</style>