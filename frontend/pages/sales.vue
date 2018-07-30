<template>
  <div class="sales">
    <div class="columns is-multiline ">
      <div class="column is-12-mobile is-6-tablet is-6-desktop">
        <Card>
          <div slot="header" class="card-header">
            <h2 class="card-header-title has-text-primary">Best Performance weekly</h2>
            <a class="card-header-icon has-text-primary">
              <span class="icon">
                <i class="icon-chart"></i>
              </span>
            </a>
          </div>
          <div class="content">
            <table class="table is-bordered is-striped  is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Count</th>
                  <th>Item</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="sale in weeklySalesBest" :key="sale._id">
                  <td>{{ sale.count }}</td>
                  <td>{{ sale.item.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <div class="column is-12-mobile is-6-tablet is-6-desktop">
        <Card>
          <div slot="header" class="card-header">
            <h2 class="card-header-title has-text-primary">Worst Performance weekly</h2>
            <a class="card-header-icon has-text-primary">
              <span class="icon">
                <i class="icon-chart"></i>
              </span>
            </a>
          </div>
          <div class="content">
            <table class="table is-bordered is-striped  is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Count</th>
                  <th>Item</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="sale in weeklySalesWorst" :key="sale._id">
                  <td>{{ sale.count }}</td>
                  <td>{{ sale.item.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <div class="column is-12-mobile is-6-tablet is-6-desktop">
        <Card>
          <div slot="header" class="card-header">
            <h2 class="card-header-title has-text-primary">Best Performance Monthly</h2>
            <a class="card-header-icon has-text-primary">
              <span class="icon">
                <i class="icon-chart"></i>
              </span>
            </a>
          </div>
          <div class="content">
            <table class="table is-bordered is-striped  is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Count</th>
                  <th>Item</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="sale in monthlySalesBest" :key="sale._id">
                  <td>{{ sale.count }}</td>
                  <td>{{ sale.item.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <div class="column is-12-mobile is-6-tablet is-6-desktop">
        <Card>
          <div slot="header" class="card-header">
            <h2 class="card-header-title has-text-primary">Worst Performance Monthly</h2>
            <a class="card-header-icon has-text-primary">
              <span class="icon">
                <i class="icon-chart"></i>
              </span>
            </a>
          </div>
          <div class="content">
            <table class="table is-bordered is-striped  is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Count</th>
                  <th>Item</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="sale in monthlySalesWorst" :key="sale._id">
                  <td>{{ sale.count }}</td>
                  <td>{{ sale.item.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
    
  </div>
</template>

<script>
import Card from '~/components/shared/Card.vue'
import { mapGetters } from 'vuex';

export default {
  layout: 'admin',
  middleware: 'authenticated',
  components: {
    Card
  },  
  data () {
    return { 
      isLoading: true,
      weeklySalesBest: [],
      weeklySalesWorst: [],
      monthlySalesBest: [],
      monthlySalesWorst: []
    }
  },
  async asyncData ({ params, app, store }) {
    try {
      // get the token
      const token = store.state.token;

      const weeklyBestResponse = await app.$axios.$get('sale/best_weekly', {
        headers: { 'Authorization' : 'BEARER ' + token }
      });

      const weeklyWorstResponse = await app.$axios.$get('sale/worst_weekly', {
        headers: { 'Authorization' : 'BEARER ' + token }
      });

      const monthlyBestResponse = await app.$axios.$get('sale/best_monthly', {
        headers: { 'Authorization' : 'BEARER ' + token }
      });

      const monthlyWorstResponse = await app.$axios.$get('sale/worst_monthly', {
        headers: { 'Authorization' : 'BEARER ' + token }
      });
      
      return { 
        weeklySalesBest: weeklyBestResponse.payload,
        weeklySalesWorst: weeklyWorstResponse.payload,
        monthlySalesBest: monthlyBestResponse.payload,
        monthlySalesWorst: monthlyWorstResponse.payload,
        isLoading: false 
      };
    }
    catch(err){
      console.log({err});
      return { isLoading: false }
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
