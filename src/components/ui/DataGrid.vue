<template>
  <div>
    <table class="datagrid">
      <tr>
        <th
          v-for="column in columns"
          :key="column.prop"
          :style="{ width: column.size ? column.size + 'px' : 'auto' }"
        >
          {{ column.name }}
        </th>
      </tr>
      <tr v-for="row in source" :key="row.id">
        <td v-for="col in row" :key="col">{{ col }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    columns: Array,
    source: Array,
  },
};
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
.datagrid th {
  text-align: left;
  padding: 1rem 2rem;
}
tr {
  border-bottom: 1px solid $light-gray;
  transition: 0.3s all;
}
tr:hover {
  background-color: $light-gray;
  color: $black !important;
  cursor: pointer;
}
td {
  padding: 0.7rem 2rem;
  color: $medium-gray;
}
</style>
