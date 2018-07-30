<template>
  <div class="users">
    <h1 class="title">Stock's Details</h1>
    <div class="users__info">
      <!-- Display blank if no user parameters -->
      <Blank :height="'70vh'" v-if="stockExist">
        <i class="fa fa-signal fa-4x"></i>
        <p>Stock not Found</p>
      </Blank>
      <!--Users card -->
      <Card width="400px" v-else>
        <div slot="header" class="card-header">
          <h2 class="card-header-title has-text-primary">{{stock.item ? stock.item.name : 'NA'}}</h2>
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
                <td>Quantity</td>
                <td>{{stock.quantity}}</td>
              </tr>
              <tr>
                <td>Stocked Quantity</td>
                <td>{{stock.stockedQuantity}}</td>
              </tr>
              <tr>
                <td>Current Stock</td>
                <td>{{ evaluator(stock.isCurrentStock) }}</td>
              </tr>
              <tr>
                <td>Dismissed</td>
                <td>{{ evaluator(stock.isDismissed) }}</td>
              </tr>
              <tr>
                <td>Fully Stocked</td>
                <td>{{ evaluator(stock.isFullyStocked) }}</td>
              </tr>
              <tr>
                <td>Low on stock</td>
                <td>{{ evaluator(stock.isLowOnStock) }}</td>
              </tr>
              <tr>
                <td>Out of Stock</td>
                <td>{{ evaluator(stock.isOutOfStock) }}</td>
              </tr>
              <tr>
                <td>Over Stocked</td>
                <td>{{ evaluator(stock.isOverStocked) }}</td>
              </tr>
              <tr>
                <td>Created</td>
                <td>{{ stock.created_at | moment("from") || '' }}</td>
              </tr>
              <tr>
                <td>Expired</td>
                <td>{{ stock.expiryDate | moment("from") || '' }}</td>
              </tr>
              <tr>
                <td>Updated</td>
                <td>{{ stock.updated_at | moment("from") || '' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </Card>
      <!-- show loader when fetching stock, hide loader when done -->
      <Loader v-if="isLoading"/>
    </div>
    
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
        const stockId = params.stockId;
        // get the token
        const token = store.state.token;
        const response = await app.$axios.$get(`stock/${stockId}`, {
          headers: { 'Authorization' : 'BEARER ' + token }
        });
        
        
        const roleResponse = await app.$axios.$get('user/get/roles', {
          headers: { 'Authorization': 'BEARER ' + token }
        });
        return { 
          stock: response.payload,
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
      evaluator(value) {
        return value === 1 ? 'Yes' : 'No';
      },
      async editUser (event , stockId) {
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
          const response = await this.$axios.$put(`user/${stockId}`, { user }, {
            headers: { 'Authorization' : 'BEARER ' + token }
          });
        } 
        catch (err) {
          console.log({err});
        }
      },
      async deleteUser (stockId) {
        const _confirm = window.confirm('Are you sure about this?');
        if(!_confirm) {
          return;
        }
        try {
          // get the token
          const token = this.$store.state.token;
          const response = await this.$axios.$delete(`stock/${stockId}`, {
            headers: { 'Authorization' : 'BEARER ' + token }
          });
          //redirect to stocks pages
          this.$router.push({
            name: 'stocks'
          });
        }
        catch (err) {
          console.log({err});
        }
      }
    },
    computed: {
      stockExist() {
        return !Object.keys(this.stock).length
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