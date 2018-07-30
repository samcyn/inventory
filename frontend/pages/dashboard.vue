<template>
  <div class="dashboard">

    <div class="columns is-multiline">

      <div class="column is-12-mobile is-3-tablet is-3-desktop">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h2 class="content__title">{{ profit }}</h2>
              <h6 class="content__subtitle">Profit</h6>
              <hr class="content__hr has-background-primary">
              <small>week</small>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-12-mobile is-3-tablet is-3-desktop">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h2 class="content__title">{{incomes[0].grandQuantity }}</h2>
              <h6 class="content__subtitle">Grand Quantity</h6>
              <hr class="content__hr has-background-primary">
              <small>week</small>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-12-mobile is-3-tablet is-3-desktop">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h2 class="content__title">{{ incomes[0].grandCost }}</h2>
              <h6 class="content__subtitle">Grand Cost</h6>
              <hr class="content__hr has-background-primary">
              <small>week</small>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-12-mobile is-3-tablet is-3-desktop">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h2 class="content__title">{{ incomes[0].grandSale }}</h2>
              <h6 class="content__subtitle">Grand Sale</h6>
              <hr class="content__hr has-background-primary">
              <small>week</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns is-multiline">

      <div class="column is-12-mobile is-3-tablet is-3-desktop">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h2 class="content__title">{{ mprofit }}</h2>
              <h6 class="content__subtitle">Profit</h6>
              <hr class="content__hr has-background-primary">
              <small>Month</small>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-12-mobile is-3-tablet is-3-desktop">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h2 class="content__title">{{mIncomes[0].grandQuantity }}</h2>
              <h6 class="content__subtitle">Grand Quantity</h6>
              <hr class="content__hr has-background-primary">
              <small>Month</small>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-12-mobile is-3-tablet is-3-desktop">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h2 class="content__title">{{ mIncomes[0].grandCost }}</h2>
              <h6 class="content__subtitle">Grand Cost</h6>
              <hr class="content__hr has-background-primary">
              <small>Month</small>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-12-mobile is-3-tablet is-3-desktop">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h2 class="content__title">{{ mIncomes[0].grandSale }}</h2>
              <h6 class="content__subtitle">Grand Sale</h6>
              <hr class="content__hr has-background-primary">
              <small>Month</small>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  layout: 'admin',
  middleware: 'authenticated',  
  data () {
    return {
      isLoading: true,
      showLine: false,
      speedData : {
        labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"],
        datasets: [{
          label: "Best Performance",
          data: [0, 59, 75, 20, 20, 55, 40],
        }]
      },
      chartOptions : {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 80,
            fontColor: 'black'
          }
        }
      }
    }
  },
  async asyncData({ params, app, store }) {
    const token = store.state.token;
    const response = await app.$axios.$get(`sale/income_weekly`, {
      headers: { 'Authorization' : 'BEARER ' + token }
    });
    const monthResponse = await app.$axios.$get('sale/income_monthly', {
      headers: { 'Authorization' : 'BEARER ' + token }
    });
    console.log(monthResponse);
    return { 
      incomes: response.payload,
      mIncomes: response.payload,
      isLoading: false 
    };
  },
  mounted () {
    this.showLine = true;
    
  },
  methods: {
   
  },
  // computed: mapGetters([
  //   'isAuthenticated',
  //   'loggedUser'
  // ])
  computed: {
    profit () {
      let { grandCost, grandSale } = this.incomes[0];
      return grandSale - grandCost;
    },
    mprofit () {
      let { grandCost, grandSale } = this.mIncomes[0];
      return grandSale - grandCost;
    }
  }
}
</script>

<style scoped lang="scss">
  .content {
    text-align: center;
  }
  .content__title {
    font-size: 30px;
    font-weight: 900;
  }
  .content__hr{
    margin: 20px auto;
    max-width: 100px;
  }
</style>
