<template>
  <div class="items">
    <div class="items__add is-clearfix">
      <button class="button is-primary is-pulled-right" @click="openModal">Add Item</button>
    </div>
    <br/>
    <div class="items__filter">
      <div class="field-body">
        <div class="field">
          <div class="control is-expanded">
            <input class="input is-black" placeholder="search for items" @keyup.prevent="fetchAllItemsByFilter($event)"/>
          </div>
        </div>
        <div class="field">
          <div class="control is-expanded">
            <div class="select is-black is-fullwidth">
              <select @change="fetchAllItemsByCategory">
                <option :value="null"></option>
                <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
              </select>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <br/>
    
    <div class="items__info">
      <!-- Show blank if no items -->
      <Blank :height="'70vh'" v-if="items.length === 0">
        <i class="fa fa-signal fa-4x"></i>
        <p>No items Data</p>
      </Blank>
      <!-- display items info -->
      <div v-else>
        <DataTable :head="tableHeading">
          <tr v-for="item in items" :key="item._id">
            <td >{{ item.item_id }}</td>
            <td >{{ item.name}}</td>            
            <td>{{ item.sellingPrice}}</td>
            <td>{{ item.costPrice }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.created_at | moment("dddd, MMMM Do YYYY") }}</td>                             
            <td><nuxt-link class="has-text-primary" :to="{ name: 'store-itemId', params: { itemId: item._id }}">View</nuxt-link></td> 
          </tr>
        </DataTable>
        <!-- show pagination -->
        <Pagination @filterTable="filterTable" :page="tableData.page" :limit="tableData.limit" :count="count"/>
      </div>
      <!-- show loader when fetching items, hide loader when done -->
      <Loader v-if="isLoading"/>
    </div>
    
    <Modal :isActive="isActive" @closeModal="closeModal">
      <Card width="400px">
        <form @submit.prevent="addItem($event)">

          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input is-black" type="text" placeholder="item name" v-model="formData.name" required>
            </div>
          </div>

          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <input class="input is-black" type="text" placeholder="Item Description" v-model="formData.description" required>
            </div>
            <p class="help is-danger" v-if="errorCode === 0 ">This number is already in use</p>
          </div>

          <div class="field">
            <label class="label">Tags</label>
            <div class="control">
              <input class="input is-black" type="text" placeholder="Tags" v-model="formData.tags" required>
            </div>
            <p class="help is-danger" v-if="errorCode === 1">This email is already in use</p>
          </div>

          <div class="field">
            <label class="label">Cost Price</label>
            <div class="control">
              <input class="input is-black" type="number" placeholder="Cost Price" v-model.number="formData.costPrice" required>
            </div>
            <p class="help is-danger" v-if="errorCode === 1">This email is already in use</p>
          </div>

          <div class="field">
            <label class="label">Selling Price</label>
            <div class="control">
              <input class="input is-black" type="text" placeholder="Selling Price" v-model.number="formData.sellingPrice" required>
            </div>
            <p class="help is-danger" v-if="errorCode === 1">This email is already in use</p>
          </div>


          <div class="field">
            <label class="label">Quantity</label>
            <div class="control">
              <input class="input is-black" type="text" placeholder="Quantity" v-model.number="formData.quantity" required>
            </div>
            <p class="help is-danger" v-if="errorCode === 1">This email is already in use</p>
          </div>


          <div class="field">
            <label class="label">Category</label>
            <div class="control">
              <div class="select is-black is-fullwidth">
                <select v-model="formData.category">
                  <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
                </select>
              </div>
            </div>
          </div>


          <div class="field">
            <label class="label">Expiry Date</label>
            <div class="control">
              <input class="input is-black" type="date" placeholder="Expiry Date" v-model="formData.expiryDate" required>
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
      tableHeading: ['#ID', 'Name', 'Selling Price', 'Cost Price', 'Quantity', 'Created At', 'Action'],
      items: [],
      categories: [],
      isActive: false,
      formData: {},
      isLoading: false,
      count: 0,
      tableData : {
        page: 1,
        limit: 10,
        filter: null,
        category: null
      },
      error: null,
      activeDropdown: false,
      picked: null,
      isFecthingcategories: false
    }
  },
  async mounted() {
    try {
      //show loader
      this.isLoading = true;

      //get all items
     // this.getitems();
      const token = this.$store.state.token;
      const page = this.tableData.page;
      const limit = this.tableData.limit;
      const response = await this.$axios.$get('item', {
        headers: { 'Authorization': 'BEARER ' + token },
        params : { page: page, limit: limit }
      });
      const responseCategory = await this.$axios.$get('item/get/categories', {
        headers: { 'Authorization': 'BEARER ' + token }
      });
      console.log(responseCategory);

      this.items = response.payload.items;
      
      //get total  number of items
      this.count = response.payload.total;
      
      //get all categories
      this.categories = responseCategory.payload;

      //hide loader
      this.isLoading = false;
      //console.log("categories", this.categories, this.items);
    } 
    catch(err) {
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
    async getitems () {
      const token = this.$store.state.token;
      const tableData = this.tableData;
      const response = await this.$axios.$get('item', {
        headers: { 'Authorization': 'BEARER ' + token },
        params : tableData
      });
      this.items = response.payload.items;
      //get total  number of items
      this.count = response.payload.total;      
    },
    async addItem (event) {
      try {
        // get the token
        const token = this.$store.state.token;
        const formData = this.formData;
        const item = {
          name: formData.name,
          costPrice: formData.costPrice,
          sellingPrice: formData.sellingPrice,
          quantity: formData.quantity,
          description: formData.description,
          category: formData.category,
          expiryDate: formData.expiryDate,
          tags: formData.tags
        }
      
        // post form 
        const response = await this.$axios.$post('item', { item }, {
          headers: { 'Authorization' : 'BEARER ' + token }
        });
        console.log(response.payload);

        //reset form 
        this.formData = {};

        //close modal
        this.isActive = false;

        //get all items
        this.getitems();
      } 
      catch (err) {
        console.log({err});
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
      this.getitems();
    },
    fetchAllItemsByFilter (event) {
      let search = event.target.value;
      const token = this.$store.state.token;
      this.tableData.page = 1,
      this.tableData.limit = 10,
      this.tableData.filter = search;
      this.tableData.category = null;
      this.getitems();
    },
    fetchAllItemsByCategory (event) {
      console.log('FETCHING ', event.target.value);
      this.tableData.page = 1,
      this.tableData.limit = 10,
      this.tableData.filter = null;
      this.tableData.category = event.target.value;
      this.getitems();
    }
  },
  computed: {
    errorCode () {
      const err = this.error;
      if (!err) {
        return;
      }
      const errArray = err.split(' ');
      if (errArray.includes('duplicate') && errArray.includes('dentdb.items.$phone_number_1')) {
        return 0;
      }
      else if (errArray.includes('duplicate') && errArray.includes('dentdb.items.$email_1')) {
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
  .dropdown-menu{
    width: 100%;
  }
  .dropdown-radio{
    opacity: 0;
  }
  .items__info{
    position: relative;
    min-height: 70vh;
  }

  

 @media 
  only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
    td:nth-of-type(1):before { content: "ID"; font-weight: bold; }
    td:nth-of-type(2):before { content: "Name"; font-weight: bold; }
    td:nth-of-type(3):before { content: "Selling Price"; font-weight: bold; }    
    td:nth-of-type(4):before { content: "Cost Price"; font-weight: bold; }
    td:nth-of-type(5):before { content: "Quantity"; font-weight: bold; }
    td:nth-of-type(6):before { content: "Created At"; font-weight: bold; }
    td:nth-of-type(7):before { content: "Action"; font-weight: bold; }
  }
  
</style>
