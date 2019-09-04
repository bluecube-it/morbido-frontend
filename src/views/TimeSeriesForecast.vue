<template>
  <div class="container-fluid">
    <div class="py-5">
      <h2>Time Series Forecast</h2>
      <p class="lead">Predict trends with Machine Learning</p>
    </div>

    <div class="row mb-5">
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Last Predictions</span>
        </h4>
      </div>
      <div class="col-md-8 order-md-1">
        <h4 class="mb-3">Configuration</h4>
        <form class="needs-validation" novalidate="">
          <div class="row">
            <div class="col-md-6 mb-6">
              <label for="state">Dataset</label>
              <select class="custom-select d-block w-100" id="state" required="">
                <option value="">Choose...</option>
                <option>California</option>
              </select>
              <div class="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <label for="lastName">Predict From</label>
              <input type="date" class="form-control" id="zip" placeholder="" required="">
              <div class="invalid-feedback">
                This field is required
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <label for="lastName">Predict To</label>
              <input type="date" class="form-control" id="zip" placeholder="" required="">
              <div class="invalid-feedback">
                This field is required
              </div>
            </div>
          </div>

          <hr class="mb-4">
          <b-button variant="primary" block @click="makePrediction">
            <b-spinner small v-if="isLoading"></b-spinner>
            <span v-if="!isLoading">Predict Time Series</span>
          </b-button>
        </form>

        <div class="mt-5">
          <line-chart :data="graph" height="500px" :dataset="{borderWidth: 5}"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  Chartkick.options = {

  }

  export default {
    name: 'time-series-forecast',
    components: {

    },
    data() {
      return {
        isLoading: false,
        graph: [
          { 
            name: 'Prediction',
            data: {
              '2017-01-01': 3,
              '2017-01-02': 4,
              '2017-01-03': 20,
              '2017-01-04': 10,
              '2017-01-05': 6,
              '2017-01-06': 18,
              '2017-01-07': 18,
              '2017-01-08': 10,
            }
          },
          {
            name: 'Real Data', 
            data: {
              '2017-01-01': 5,
              '2017-01-02': 4,
              '2017-01-03': 18,
              '2017-01-04': 16,
              '2017-01-05': 8,
              '2017-01-06': 20,
              '2017-01-07': 24,
              '2017-01-08': 12,
            }
          }
        ]
      }
    },
    methods: {
      makePrediction() {
        this.isLoading = true;
      },
    }
  };

</script>
