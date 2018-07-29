<template>
  <div class="stocks">
    <div class="stocks__add is-clearfix">
      <button class="button is-primary is-pulled-right" @click="openModal">Add Stock</button>
    </div>
    <br/>
    <div class="stocks__info">
      <!-- Show blank if no stocks -->
      <Blank :height="'70vh'" v-if="stocks.length === 0">
        <i class="fa fa-signal fa-4x"></i>
        <p>No stocks Data</p>
      </Blank>
      <!-- display stocks info -->
      <div v-else>
        <DataTable :head="tableHeading">
          <tr v-for="stock in stocks" :key="stock._id">
            <td >{{ stock.item ? stock.item.name : '' }}</td>
            <td>{{ stock.sellingPrice}}</td>
            <td>{{ stock.costPrice }}</td>
            <td>{{ stock.quantity }}</td>
            <td>{{ stock.created_at | moment("dddd, MMMM Do YYYY") }}</td>                        
            <td>{{ stock.expiryDate | moment("dddd, MMMM Do YYYY") }}</td>            
            <td><nuxt-link class="has-text-primary" :to="{ name: 'stocks-stockId', params: { stockId: stock._id }}">View</nuxt-link></td> 
          </tr>
        </DataTable>
        <!-- show pagination -->
        <Pagination @filterTable="filterTable" :page="tableData.page" :limit="tableData.limit" :count="count"/>
      </div>
      <!-- show loader when fetching stocks, hide loader when done -->
      <Loader v-if="isLoading"/>
    </div>

    <Modal :isActive="isActive" @closeModal="closeModal">
      <Card width="400px">
        <div class="dropdown is-fullwidth is-block" :class="activeDropdown ? 'is-active' : ''" >
          <div class="dropdown-trigger">
            <button class="button is-primary is-fullwidth" role="button" aria-haspopup="true" aria-controls="dropdown-menu3" @click="toggleDropdown">
              <span>{{ picked || 'Choose Item' }}</span>
              <span class="icon is-small">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu is-fullwidth" id="dropdown-menu3" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <div class="control is-small" :class="isFecthingItems ? 'is-loading': ''">
                  <input type="text" class="input is-small is-black" placeholder="find items" @keyup.prevent="fetchItems($event)"/>
                </div>
              </div>
              <a  class="dropdown-item" v-for="item in items" :key="item._id">
                <label :for="item._id"><input type="radio" :id="item._id" :value="item.name" v-model="picked" @change="onItemChangeHandler($event, item._id)"/> {{ item.name }}</label>
              </a>
            </div>
          </div>
        </div>
        <br/>
        <form @submit.prevent="addStock($event)" class="blurry">
          <div class="field">
            <label class="label">Cost Price</label>
            <div class="control">
              <input class="input is-black" type="number" placeholder="cost price" v-model.number="formData.costPrice" required disabled>
            </div>
          </div>

          <div class="field">
            <label class="label">Selling Price</label>
            <div class="control">
              <input class="input is-black" type="number" placeholder="Selling Price" v-model.number="formData.sellingPrice" required disabled>
            </div>
            <p class="help is-danger" v-if="errorCode === 0 ">This number is already in use</p>
          </div>

          <div class="field">
            <label class="label">Quantity</label>
            <div class="control">
              <input class="input is-black" type="number" placeholder="Quantity" v-model.number="formData.quantity" required disabled>
            </div>
            <p class="help is-danger" v-if="errorCode === 1">This email is already in use</p>
          </div>

          <div class="field">
            <label class="label">Expiry Date</label>
            <div class="control">
              <input class="input is-black" type="date" placeholder="Expiry Date" v-model="formData.expiryDate" required>
            </div>
            <p class="help is-danger" v-if="errorCode === 2">password must be at least 6 digits and less than 50 digits</p>
          </div>
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" v-model="formData.updatePrice">
                Update Price
              </label>
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
      tableHeading: ['#ID', 'Selling Price', 'Cost Price', 'Quantity', 'Created At', 'Expiry Date', 'Action'],
      stocks: [],
      items: [],
      isActive: false,
      formData: {},
      isLoading: false,
      count: 0,
      tableData : {
        page: 1,
        limit: 10
      },
      error: null,
      activeDropdown: false,
      picked: null,
      isFecthingItems: false
    }
  },
  async mounted() {
    try {
      //show loader
      this.isLoading = true;

      //get all stocks
     // this.getstocks();
      const token = this.$store.state.token;
      const page = this.tableData.page;
      const limit = this.tableData.limit;
      const response = await this.$axios.$get('stock', {
        headers: { 'Authorization': 'BEARER ' + token },
        params : { page: page, limit: limit }
      });
    
      this.stocks = response.payload.stocks;
  
      //get total  number of stocks
      this.count = response.payload.total;
      //this.items = itemResponse.payload.items;

      //hide loader
      this.isLoading = false;
      //console.log("items", this.items, this.stocks);
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
    async getstocks () {
      const token = this.$store.state.token;
      const page = this.tableData.page;
      const limit = this.tableData.limit;
      const response = await this.$axios.$get('stock', {
        headers: { 'Authorization': 'BEARER ' + token },
        params : { page: page, limit: limit }
      });
      this.stocks = response.payload.stocks;
      //get total  number of stocks
      this.count = response.payload.total;      
    },
    async addStock (event) {
      try {
        // get the token
        const token = this.$store.state.token;
        const formData = this.formData;
        const stock = {
          costPrice: formData.costPrice,
          sellingPrice: formData.sellingPrice,
          quantity: formData.quantity,
          item: formData._id,
          expiryDate: formData.expiryDate
        }
        console.log(stock);
        const updatePrice = formData.updatePrice ? 1 : 0;
        // post form 
        const response = await this.$axios.$post('stock', stock, {
          headers: { 'Authorization' : 'BEARER ' + token },
          params : { updatePrice }
        });
        console.log(response.payload);

        //reset form 
        this.formData = {};

        //close modal
        this.isActive = false;
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
      this.getstocks();
    },
    fetchItems : async function (event) {
      let search = event.target.value;
      const token = this.$store.state.token;
      this.isFecthingItems = true;
      try {
        const itemResponse = await this.$axios.$get('item', {
          headers: { 'Authorization': 'BEARER ' + token },
          params : { filter: search }
        });
        this.items = itemResponse.payload.items;
        this.isFecthingItems = false;
      }
      catch (err) {
        console.log({err});
        this.isFecthingItems = false;
      }
    },
    toggleDropdown () {
      this.activeDropdown = !this.activeDropdown;
    },
    async onItemChangeHandler(event, itemId) {
      this.activeDropdown = false;
      const token = this.$store.state.token;
      try {
        const response = await this.$axios.$get(`item/${itemId}`, {
          headers: { 'Authorization': 'BEARER ' + token }
        });
        this.formData = response.payload;
      }
      catch (err) {
        console.log({err});
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
      if (errArray.includes('duplicate') && errArray.includes('dentdb.stocks.$phone_number_1')) {
        return 0;
      }
      else if (errArray.includes('duplicate') && errArray.includes('dentdb.stocks.$email_1')) {
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
  .stocks__info{
    position: relative;
    min-height: 70vh;
  }

  

 @media 
  only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
    td:nth-of-type(1):before { content: "ID"; font-weight: bold; }
    td:nth-of-type(2):before { content: "Selling Price"; font-weight: bold; }
    td:nth-of-type(3):before { content: "Cost Price"; font-weight: bold; }
    td:nth-of-type(4):before { content: "Quantity"; font-weight: bold; }
    td:nth-of-type(5):before { content: "Created At"; font-weight: bold; }
    td:nth-of-type(6):before { content: "Expiry Date"; font-weight: bold; }
    td:nth-of-type(7):before { content: "Action"; font-weight: bold; }
    
  }
  
</style>
