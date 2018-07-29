<template>
  <nav class="pagination" role="navigation" aria-label="pagination">
    <a class="pagination-previous" title="This is the first page" :disabled="page === 1" @click="$emit('filterTable', 'prev')">Previous</a>
    <a class="pagination-next" @click="next" :disabled="page === totalPage">Next page</a>
    <ul class="pagination-list">
      <li>
        <a class="pagination-link" :class="page === 1 ? 'is-current' : ''"  aria-label="Page 1" aria-current="page" @click="$emit('filterTable', 1)">1</a>
      </li>
      <!-- show this only if the total page is 2 is greater than 2 -->
      <li v-if="2 <= totalPage">
        <a class="pagination-link" :class="page === 2 ? 'is-current' : ''" aria-label="Goto page 2" @click="$emit('filterTable', 2)">2</a>
      </li>
      <!-- show this only if the total page is 3 is greater than 3 -->
      <li v-if="3 <= totalPage">
        <a class="pagination-link" :class="page === 3 ? 'is-current' : ''"  aria-label="Goto page 3" @click="$emit('filterTable', 3)">3</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    props: ['pagination', 'page', 'count', 'limit'],
    methods: {
      next () {
        if ( this.page === this.totalPage) {
          return;
        }
        this.$emit('filterTable', 'next');
      }
    },
    computed: {
      totalPage () {
        return Math.ceil(this.count/this.limit);
      }
    }
  }
</script>

<style scoped>
</style>