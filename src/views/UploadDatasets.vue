<template>
  <div class="container-fluid">
    <div class="py-5">
      <h2>Upload Datasets</h2>
      <p class="lead">In this page you can upload your dataset, currently the system accept only CSV files.</p>
    </div>

    <div class="row mb-5">
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Upload Dataset</span>
        </h4>
        <FileUpload />
      </div>
      <div class="col-md-8 order-md-1">
        <h4 class="mb-3">Dataset List</h4>
        <DatasetsTableComponent />
      </div>
    </div>

  </div>
</template>

<script>
  import DatasetsTableComponent from '../components/DatasetsTableComponent';
  import FileUpload from '../components/FileUpload';

  export default {
    name: 'upload-datasets',
    components: {
      DatasetsTableComponent,
      FileUpload
    },
  };

</script>
