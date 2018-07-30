import Vue from 'vue'
import { Line } from 'vue-chartjs'

Vue.component('my-line', {
  extends: Line,
  props: ['data', 'options'],
  mounted () {
   this.renderChart(this.data, this.options)
  }
})


// Line.extend({
//   props: ['data', 'options'],
//   mounted () {
//     this.renderChart(this.data, this.options)
//   }
// }));