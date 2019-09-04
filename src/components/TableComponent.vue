<template>
  <div class="card">


    <div class="table-responsive">
      <table class="table card-table table-vcenter table-hover">
        <thead>
          <tr>
            <th># ID</th>
            <th>Name</th>
            <th>Price</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-nowrap">Ciao</td>
            <td class="text-nowrap">Bello</td>
            <td class="text-nowrap">12.00</td>
            <td class="text-right">ciao</td>
          </tr>
          <tr>
            <td class="text-nowrap">Ciao</td>
            <td class="text-nowrap">Bello</td>
            <td class="text-nowrap">12.00</td>
            <td class="text-right">ciao</td>
          </tr>
        </tbody>
      </table>
    </div>



  </div>
</template>

<script>
  export default {
    beforeMount() {
      //this.getData();
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

<style type="text/css" scoped>
  .table th,
  .text-wrap table th {
    color: #666;
    text-transform: uppercase;
    font-size: 0.875rem;
    font-weight: 700;
  }

  .card-table {
    margin-bottom: 0;
  }

  .card-header {
    border-bottom: 0px;
  }

  .card-header {
    background: none;
    padding: 0.5rem 1.5rem;
    display: -ms-flexbox;
    display: flex;
    min-height: 3.5rem;
    -ms-flex-align: center;
    align-items: center;
  }

  .card-title {
    font-size: 1.125rem;
    line-height: 1.2;
    font-weight: 400;
    margin-bottom: 0rem;
  }

  .card-table tr td:first-child,
  .card-table tr th:first-child {
    padding-left: 1.5rem;
  }

  .card-table tr td:last-child,
  .card-table tr th:last-child {
    padding-right: 1.5rem;
  }

  .table thead th {
    border-bottom: 1px solid #dee2e6;
  }

  .table>thead>tr:first-child>th {
    border-top: 0px solid #dee2e6;
  }

</style>
