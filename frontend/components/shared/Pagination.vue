<template>
  <nav class="pagination" role="navigation" aria-label="pagination">
    <a class="pagination-previous" title="This is the first page" :disabled="page === 1" @click="$emit('filterTable', 'prev')">Previous</a>
    <a class="pagination-next" @click="$emit('filterTable', 'next')">Next page</a>
    <ul class="pagination-list">
      <li>
        <a class="pagination-link" :class="page === 1 ? 'is-current' : ''"  aria-label="Page 1" aria-current="page" @click="$emit('filterTable', 1)">1</a>
      </li>
      <li>
        <a class="pagination-link" :class="page === 2 ? 'is-current' : ''" aria-label="Goto page 2" @click="$emit('filterTable', 2)">2</a>
      </li>
      <li>
        <a class="pagination-link" :class="page === 3 ? 'is-current' : ''"  aria-label="Goto page 3" @click="$emit('filterTable', 3)">3</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    props: ['pagination', 'page'],
    computed: {
     
    }
  }
</script>

<style scoped>
</style>