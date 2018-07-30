<template>
  <div class="users">
    <h1 class="title">Item's Details</h1>
    <div class="users__info">
      <!-- Display blank if no user parameters -->
      <Blank :height="'70vh'" v-if="stockExist">
        <i class="fa fa-signal fa-4x"></i>
        <p>Stock not Found</p>
      </Blank>
      <!--Users card -->
      <Card width="400px" v-else>
        <div slot="header" class="card-header">
          <h2 class="card-header-title has-text-primary">{{ item.name }}</h2>
          <a class="card-header-icon has-text-primary">
            <span class="icon">
              <i class="icon-bag"></i>
            </span>
          </a>
        </div>
        <div class="content">
          <table class="table is-bordered is-striped  is-hoverable is-fullwidth">
            <tbody>
              <tr>
                <td>#ID</td>
                <td>{{item.item_id}}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{{item.description}}</td>
              </tr>
              <tr>
                <td>Tags</td>
                <td>{{item.tags}}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>{{ item.category ? item.category.name : '' }}</td>
              </tr>
              <tr>
                <td>Quantity</td>
                <td>{{item.quantity}}</td>
              </tr>
              <tr>
                <td>Created</td>
                <td>{{ item.created_at | moment("from") || '' }}</td>
              </tr>
              <tr>
                <td>Updated</td>
                <td>{{ item.updated_at | moment("from") || '' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div slot="footer" class="card-footer">
          <a class="card-footer-item has-text-primary" @click="openModal"><i class="icon-pencil"></i> <span>Edit</span> </a> 
          <a class="card-footer-item has-text-primary" @click="deleteUser(item._id)"><i class="icon-trash"></i>  <span>Delete</span></a>         
        </div>
      </Card>
      <!-- show loader when fetching stock, hide loader when done -->
      <Loader v-if="isLoading"/>
    </div>
    <!-- Modal to edit user -->
    
    <Modal :isActive="modalIsActive" @closeModal="closeModal" v-if="!!item">
      <Card width="400px">
         <form @submit.prevent="editUser($event, item._id)">

          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input is-black" type="text" placeholder="item name" v-model="item.name" required>
            </div>
          </div>

          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <input class="input is-black" type="text" placeholder="Item Description" v-model="item.description" required>
            </div>
            <p class="help is-danger" v-if="errorCode === 0 ">This number is already in use</p>
          </div>

          <div class="field">
            <label class="label">Tags</label>
            <div class="control">
              <input class="input is-black" type="text" placeholder="Tags" v-model="item.tags" required>
            </div>
            <p class="help is-danger" v-if="errorCode === 1">This email is already in use</p>
          </div>

          <div class="field">
            <label class="label">Cost Price</label>
            <div class="control">
              <input class="input is-black" type="number" placeholder="Cost Price" v-model.number="item.costPrice" required>
            </div>
            <p class="help is-danger" v-if="errorCode === 1">This email is already in use</p>
          </div>

          <div class="field">
            <label class="label">Selling Price</label>
            <div class="control">
              <input class="input is-black" type="text" placeholder="Selling Price" v-model.number="item.sellingPrice" required>
            </div>
            <p class="help is-danger" v-if="errorCode === 1">This email is already in use</p>
          </div>


          <div class="field">
            <label class="label">Quantity</label>
            <div class="control">
              <input class="input is-black" type="text" placeholder="Quantity" v-model.number="item.quantity" required>
            </div>
            <p class="help is-danger" v-if="errorCode === 1">This email is already in use</p>
          </div>


          <div class="field">
            <label class="label">Category</label>
            <div class="control">
              <div class="select is-black is-fullwidth">
                <select v-model="item.category._id">
                  <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
                </select>
              </div>
            </div>
          </div>


          <div class="field">
            <label class="label">Expiry Date</label>
            <div class="control">
              <input class="input is-black" type="date" placeholder="Expiry Date" v-model="item.expiryDate" required>
            </div>
            <p class="help is-danger" v-if="errorCode === 2">password must be at least 6 digits and less than 50 digits</p>
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
        item: {},
        categories: [],
        formData: {},
        isLoading: true,
        modalIsActive: false,
        error: null
      }
    },
    async asyncData ({ params, app, store }) {
      try {
        const itemId = params.itemId;
        // get the token
        const token = store.state.token;
        const response = await app.$axios.$get(`item/${itemId}`, {
          headers: { 'Authorization' : 'BEARER ' + token }
        });
        return { 
          item: response.payload,
          isLoading: false 
        };
      }
      catch(err){
        console.log({err});
        return { isLoading: false }
      }
    },
    async mounted() {
      const token = this.$store.state.token;
      const responseCategory = await this.$axios.$get('item/get/categories', {
          headers: { 'Authorization': 'BEARER ' + token }
      });
      this.categories = responseCategory.payload;
    },
    methods: {
      openModal () {
        // this.formData = this.item;
        this.modalIsActive = true;
      },
      closeModal () {
        // this.formData = {};
        this.modalIsActive = false;
      },
      evaluator(value) {
        return value === 1 ? 'Yes' : 'No';
      },
      async editUser (event , itemId) {
        try {
          // get the token
          const token = this.$store.state.token;
          const item = {
            name: this.item.name,
            description: this.item.description,
            tags: this.item.tags,
            costPrice: this.item.costPrice,
            sellingPrice: this.item.sellingPrice,
            quantity: this.item.quantity,
            category: this.item.category._id,
            expiryDate: this.item.expiryDate
          };
          const response = await this.$axios.$put(`item/${itemId}`, { item }, {
            headers: { 'Authorization' : 'BEARER ' + token }
          });
          this.modalIsActive = false;
        } 
        catch (err) {
          console.log({err});
        }
      },
      async deleteUser (itemId) {
        const _confirm = window.confirm('Are you sure about this?');
        if(!_confirm) {
          return;
        }
        try {
          // get the token
          const token = this.$store.state.token;
          const response = await this.$axios.$delete(`item/${itemId}`, {
            headers: { 'Authorization' : 'BEARER ' + token }
          });
          //redirect to stocks pages
          this.$router.push({
            name: 'store'
          });
        }
        catch (err) {
          console.log({err});
        }
      }
    },
    computed: {
      stockExist() {
        return !Object.keys(this.item).length
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