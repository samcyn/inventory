<template>
  <table class="table is-fullwidth is-hoverable is-striped is-bordered" >
    <thead>
      <tr>
        <th v-for="(h, index) in head" :key="index">{{h}}</th>
      </tr>
    </thead>
    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'DataTable',
    props: {
      head : { type: Array, required: true }
    }
  }
</script>

<style lang="scss" scoped>
  @media (min-width: 1024px) {
    th:last-child, td:last-child{
      text-align: center;
    }
  }
  
  @media 
  only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px)  {

    /* Force table to not be like tables anymore */
    table, thead, tbody, th, td, tr { 
      display: block; 
    }
    
    /* Hide table headers (but not display: none;, for accessibility) */
    thead tr { 
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    
    
    tr { border: 1px solid #DBDBDB; }
    
    td { 
      /* Behave  like a "row" */
      border: none;
      border-bottom: 1px solid #DBDBDB; 
      position: relative;
      padding-left: 50%; 
    }
    
    td:before { 
      /* Now like a table header */
      position: absolute;
      /* Top/left values mimic padding */
      top: 6px;
      left: 6px;
      width: 45%; 
      padding-right: 10px; 
      white-space: nowrap;
    }
    
    
    // td:nth-of-type(6):before { content: "Secret Alias"; }
    // td:nth-of-type(7):before { content: "Date of Birth"; }
    // td:nth-of-type(8):before { content: "Dream Vacation City"; }
    // td:nth-of-type(9):before { content: "GPA"; }
    // td:nth-of-type(10):before { content: "Arbitrary Data"; }
  }
</style>