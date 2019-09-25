<template>
  <table class="table card-table table-vcenter table-bordered table-hover">
    <thead>
      <tr>
        <th>Original Filename</th>
        <th class="truncate">Unique Filename</th>
        <th>Size (Mb)</th>
        <th>Columns</th>
        <th>Rows</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" v-bind:key="row.id">
        <td class="text-nowrap">{{ row.original_name }}</td>
        <td class="text-nowrap truncate" :title="row.unique_name">{{ row.unique_name }}</td>
        <td class="text-nowrap">{{ formatBytes(row.size) }}</td>
        <td class="text-nowrap">{{ row.columns == null ? 'Not Set' : row.columns }}</td>
        <td class="text-nowrap">{{ row.rows == null ? 'Not Set' : row.rows }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { TrashIcon } from 'vue-feather-icons';
import axios from 'axios';
import { endpoint } from '../utils/utils';

export default {
  mounted() {
    this.getData();
  },
  components: {
    TrashIcon,
  },
  data() {
    return {
      rows: [],
      pagination: {
        pageNumber: 0,
        pageSize: 10,
        pageCount: 0,
      },
    };
  },
  props: {
    axios,
  },
  methods: {
    getData() {
      axios.get(`${endpoint}/datasets`)
        .then(res => this.rows = res.data)
        .catch(err => console.log(err));
    },
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    },
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
    },
  },
};

</script>

<style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
  .truncate {
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
