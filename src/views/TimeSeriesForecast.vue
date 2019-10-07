<template>
    <div class="container-fluid">
        <div class="py-5">
            <h2>Time Series Forecast</h2>
            <p class="lead">Predict trends with Machine Learning</p>
        </div>

        <div class="row mb-5">
            <div class="col-md-4 order-md-2 mb-4">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">Instructions</span>
                </h4>
                <p>To start a forecast you first need to
                    choose one of the previously uploaded datasets.</p>
                <p>Then, in the &quot;Time value&quot;
                    box you must select an option that represents a date &frasl;
                    time format, while in the &quot;Value to be foreseen&quot;
                    box you can select whichever option you&rsquo;re interested
                    in making the prediction about.</p>
                <p>To date, the predictable time periods are monthly and annual.</p>
                <p>The predicted value is the mean on selected period.</p>
                <h6>Suggestions</h6>
                <div class="link-list-wrapper">
                    <ul class="link-list">
                        <li>Selecting a high precision for datasets containing
                            more than 100 lines reduces the time required for the forecast.</li>
                        <li>To avoid divergent predictions it's better not to forecast a
                            period longer than one third of you dataset's time span.
                            For example, if your time span is 10 years,
                            just forecast 3 (or less) years.</li>
                        <li>It is not recommended to predict single months.</li>
                    </ul>
                </div>
            </div>
            <div class="col-md-8 order-md-1">
                <h4 class="mb-3">Configuration</h4>
                <ValidationObserver ref="observer"
                    v-slot="{ invalid }"
                    tag="form"
                    @submit.prevent="makePrediction">
                    <div class="row">
                        <div class="col-md-6 mb-6">
                            <validation-provider rules="required" v-slot="{ validated, invalid }">
                                <label for="state">Dataset</label>
                                <select class="custom-select d-block w-100"
                                    v-bind:class="{ 'is-invalid': validated && invalid }"
                                    @change="getDatasetColumns"
                                    v-model="params.filename">
                                    <option value>Choose...</option>
                                    <option v-for="dataset in datasets"
                                        v-bind:key="dataset.id"
                                        :value="dataset.unique_name">
                                        {{ dataset.original_name }}
                                    </option>
                                </select>
                                <div v-if="validated && invalid"
                                    class="invalid-feedback">Mandatory Field</div>
                            </validation-provider>
                        </div>
                    </div>
                    <hr class="mb-4" />
                    <div class="row mb-4">
                        <div class="col-md-6 mb-6">
                            <validation-provider rules="required" v-slot="{ validated, invalid }">
                                <label for="state">Time value</label>
                                <select class="custom-select d-block w-100"
                                    v-bind:class="{ 'is-invalid': validated && invalid }"
                                    v-model="params.index">
                                    <option value>Choose...</option>
                                    <option v-for="column in columns"
                                        v-bind:key="column"
                                        :value="column">{{ column }}</option>
                                </select>
                                <div v-if="validated && invalid"
                                    class="invalid-feedback">Mandatory Field</div>
                            </validation-provider>
                        </div>
                        <div class="col-md-6 mb-6">
                            <validation-provider rules="required" v-slot="{ validated, invalid }">
                                <label for="state">Time value</label>
                                <select class="custom-select d-block w-100"
                                    v-bind:class="{ 'is-invalid': validated && invalid }"
                                    v-model="params.input">
                                    <option value>Choose...</option>
                                    <option v-for="column in columns"
                                        v-bind:key="column"
                                        :value="column">
                                            {{ column }}
                                    </option>
                                </select>
                                <div v-if="validated && invalid"
                                    class="invalid-feedback">
                                    Mandatory Field
                                </div>
                            </validation-provider>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-md-4 mb-4">
                            <label for="state">Precision</label>
                            <select class="custom-select d-block w-100" v-model="params.precision">
                                <option value="low">Low</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-4">
                            <label for="state">Unit Time</label>
                            <select class="custom-select d-block w-100"
                                v-model="params.seasonality"
                                @change="setHMOptions">
                                    <option value="yearly" selected>Yearly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-4">
                            <label for="state">How Many?</label>
                            <select class="custom-select d-block w-100" v-model="params.prediction">
                                <option v-for="option in how_many_options"
                                    v-bind:value="option.id"
                                    :key="option.id"
                                    v-text="option.text">
                                </option>
                            </select>
                        </div>
                    </div>
                    <b-button variant="dark" block type="submit" :disabled="invalid">
                        <b-spinner small v-if="isLoading"></b-spinner>
                        <span v-if="!isLoading">Predict Time Series</span>
                    </b-button>
                </ValidationObserver>
                <div class="mt-5" v-if="this.graph.length > 0">
                    <line-chart :data="graph" height="500px" :dataset="{borderWidth: 5}" />
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
  created() {
    this.setHMOptions(); // init with default values (yearly)
  },
  components: {

  },
  data() {
    return {
      datasets: [],
      columns: [],
      how_many_options: [],
      isLoading: false,
      params: {
        seasonality: 'yearly',
        precision: 'low',
        filename: '',
        index: '',
        input: '',
        prediction: 1,
      },
      graph: [],
    };
  },
  methods: {
    setHMOptions(event) {
      let c = 0;
      this.how_many_options = []; // reset the select's options
      if (event) {
        // on change was triggered
        if (event.target.value === 'monthly' || event.target.value === 'quarterly') {
          c = 12;
        } else {
          c = 3;
        }
      } else {
        // just init with default values (yearly)
        c = 3;
      }
      // set options
      // this.how_many_options.push({ text: 'Choose...', id: 'undefined'});
      for (let i = 1; i <= c; i += 1) {
        this.how_many_options.push({ text: `${i}`, id: `${i}` });
      }
    },
    getDatasets() {
      axios
        .get(`${endpoint}/datasets`)
        .then((res) => {
          this.datasets = res.data;
        });
      // .catch(err => console.log(err));
    },
    getDatasetColumns() {
      axios
        .post(`${endpoint}/datasets/columns`, {
          dataset: this.params.filename,
        })
        .then((res) => {
          this.columns = res.data.columns;
        });
      // .catch(err => console.log(err));
    },
    async makePrediction() {
      const isValid = await this.$refs.observer.validate();

      if (!isValid) {
        this.$snack.danger('Make sure to enter all required data');
        return false;
      }

      this.isLoading = true;
      axios
        .post(`${endpoint}/forecasts/sarima`, this.params)
        .then((response) => {
          this.graph = response.data;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.$snack.danger({
            text: 'Something went wrong :(',
            button: 'OK',
          });
        });

      return true;
    },
  },
};
</script>
