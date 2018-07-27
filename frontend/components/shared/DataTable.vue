<template>
  <table class="table is-fullwidth is-hoverable is-striped is-bordered" >
    <thead>
      <tr>
        <th v-for="(h, index) in head" :key="index">{{h}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="index">
        <!-- TODO : probably work on this in the future -->
        <!--<td v-for="(m, i) in picks" :key="i">{{ user[m] || m }} {{i + 1}}</td>-->
        <td >{{user.username}}</td>
        <td>{{user.phone_number}}</td>
        <td>{{ user.role ? user.role.display_name : 'user' }}</td>
        <td>{{user.created_at  | moment("dddd, MMMM Do YYYY") }}</td>
        <td><nuxt-link class="has-text-primary" :to="{ name: 'users-userId', params: { userId: user._id }}">View</nuxt-link></td> 
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'DataTable',
    props: {
      head : { type: Array, required: true },
      users : {type: Array, required: true }
    },
    data () {
      return {
        // picks : ['username', 'phone_number', 'role', 'created_at', 'View']
      }
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
    
    /*
    Label the data
    */
    td:nth-of-type(1):before { content: "Name"; font-weight: bold; }
    td:nth-of-type(2):before { content: "Phone"; font-weight: bold; }
    td:nth-of-type(3):before { content: "Role"; font-weight: bold; }
    td:nth-of-type(4):before { content: "Date"; font-weight: bold; }
    td:nth-of-type(5):before { content: "Action"; font-weight: bold; }
    // td:nth-of-type(6):before { content: "Secret Alias"; }
    // td:nth-of-type(7):before { content: "Date of Birth"; }
    // td:nth-of-type(8):before { content: "Dream Vacation City"; }
    // td:nth-of-type(9):before { content: "GPA"; }
    // td:nth-of-type(10):before { content: "Arbitrary Data"; }
  }
</style>