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
              <select class="custom-select d-block w-100" @change="getDatasetColumns" v-model="params.filename">
                <option value="">Choose...</option>
                <option v-for="dataset in datasets" v-bind:key="dataset.id" :value="dataset.unique_name">{{ dataset.original_name }}</option>
              </select>
              <div class="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>
            <!-- 
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
            -->
          </div>
          <hr class="mb-4">
          <div class="row mb-4">
            <div class="col-md-6 mb-6">
              <label for="state">Time value</label>
              <select class="custom-select d-block w-100" v-model="params.index">
                <option value="">Choose...</option>
                <option v-for="column in columns" v-bind:key="column" :value="column">{{ column }}</option>
              </select>
              <div class="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>
            <div class="col-md-6 mb-6">
              <label for="state">Value to be foreseen</label>
              <select class="custom-select d-block w-100" v-model="params.input">
                <option value="">Choose...</option>
                <option v-for="column in columns" v-bind:key="column" :value="column">{{ column }}</option>
              </select>
              <div class="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-4 mb-4">
              <label for="state">Precision</label>
              <select class="custom-select d-block w-100" v-model="params.precision">
                <option value="low">Low</option>
                <option value="high">High</option>
              </select>
              <div class="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <label for="state">Unit Time</label>
              <select class="custom-select d-block w-100" v-model="params.seasonality">
                <option value="yearly">Yearly</option>
                <option value="montly">Montly</option>
              </select>
              <div class="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <label for="state">How Many?</label>
              <select class="custom-select d-block w-100" v-model="params.prediction">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <div class="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>
          </div>
          <b-button variant="dark" block @click="makePrediction">
            <b-spinner small v-if="isLoading"></b-spinner>
            <span v-if="!isLoading">Predict Time Series</span>
          </b-button>
        </form>
        <div class="mt-5" v-if="this.graph.length > 0">
          <line-chart :data="graph" height="500px" :dataset="{borderWidth: 5}"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import { endpoint } from '../utils/utils';

  export default {
    name: 'time-series-forecast',
    mounted() {
      this.getDatasets();
    },
    components: {

    },
    data() {
      return {
        datasets: [],
        columns: [],
        isLoading: false,
        params: {
          seasonality: 'yearly',
          precision: 'low',
          filename: '',
          index: '',
          input: '',
          prediction: 1
        },
        graph: [

        ]
      }
    },
    methods: {
      getDatasets() {
        axios.get(endpoint + '/datasets')
          .then(res => this.datasets = res.data)
          .catch(err => console.log(err));
      },
      getDatasetColumns() {
        axios.post(endpoint + '/datasets/columns', { dataset: this.params.filename })
          .then(res => this.columns = res.data.columns)
          .catch(err => console.log(err));
      },
      makePrediction() {
        this.isLoading = true;
        axios.post(endpoint + '/forecasts/sarima', this.params)
          .then(response => {
            this.graph = [];
            this.graph.push(response.data);
            this.isLoading = false;
          })
          .catch(err => console.log(err));
      },
    }
  };

</script>
