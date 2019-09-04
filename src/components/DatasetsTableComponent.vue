<template>
  <table class="table card-table table-vcenter table-bordered table-hover">
    <thead>
      <tr>
        <th>Filename</th>
        <th>Columns</th>
        <th>Rows</th>
        <th class="text-right">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-nowrap">weather_list.csv</td>
        <td class="text-nowrap">12</td>
        <td class="text-nowrap">872</td>
        <td class="text-right">
          <trash-icon class="cursor-pointer" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { TrashIcon } from 'vue-feather-icons';

  export default {
    beforeMount() {
      //this.getData();
    },
    components: {
      TrashIcon
    },
    data() {
      return {
        rows: [],
        pagination: {
          pageNumber: 0,
          pageSize: 10,
          pageCount: 0
        },
      };
    },
    props: {

    },
    methods: {
      // Pagination
      nextPage() {
        this.pagination.pageNumber++;
      },
      prevPage() {
        this.pagination.pageNumber--;
      },
      // Filtering
      deleteFilters() {
        this.filters = {};
      }
    },
  };

</script>

<style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
</style>
