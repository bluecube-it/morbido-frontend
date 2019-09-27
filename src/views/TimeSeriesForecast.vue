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
                <p>To start a forecast you first need to choose one of the previously uploaded datasets.</p>
                <p>Then, in the &quot;Time value&quot; box you must select an option that represents a date &frasl; time format, while in the &quot;Value to be foreseen&quot; box you can select whichever option you&rsquo;re interested in making the prediction about.</p>
                <p>To date, the predictable time periods are monthly and annual.</p>
                <p>The predicted value is the mean on selected period.</p>
                <h6>Suggestions</h6>
                <div class="link-list-wrapper">
                    <ul class="link-list">
                        <li>Selecting a high precision for datasets containing more than 100 lines reduces the time required for the forecast.</li>
                        <li>To avoid divergent predictions it's better not to forecast a period longer than one third of you dataset's time span. For example, if your time span is 10 years, just forecast 3 (or less) years.</li>
                        <li>It is not recommended to predict single months.</li>
                    </ul>
                </div>
            </div>
            <div class="col-md-8 order-md-1">
                <h4 class="mb-3">Configuration</h4>
                <ValidationObserver ref="observer" v-slot="{ passes }">
                    <form class="needs-validation" @submit.prevent="passes(makePrediction)">
                        <div class="row">
                            <div class="col-md-6 mb-6">
                                <label for="state">Dataset</label>
                                <validation-provider
                                    name="Dataset"
                                    mode="passive"
                                    rules="required"
                                    v-slot="{ errors }"
                                >
                                    <select
                                        class="custom-select d-block w-100"
                                        @change="getDatasetColumns"
                                        v-model="params.filename"
                                    >
                                        <option value>Choose...</option>
                                        <option
                                            v-for="dataset in datasets"
                                            v-bind:key="dataset.id"
                                            :value="dataset.unique_name"
                                        >{{ dataset.original_name }}</option>
                                    </select>

                                    <span>{{ errors[0] }}</span>
                                </validation-provider>
                                <div class="invalid-feedback">Please provide a valid state.</div>
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
                        <hr class="mb-4" />
                        <div class="row mb-4">
                            <div class="col-md-6 mb-6">
                                <label for="state">Time value</label>
                                <validation-provider
                                    name="Time"
                                    mode="passive"
                                    rules="required"
                                    v-slot="{ errors }"
                                >
                                    <select
                                        class="custom-select d-block w-100"
                                        v-model="params.index"
                                    >
                                        <option value>Choose...</option>
                                        <option
                                            v-for="column in columns"
                                            v-bind:key="column"
                                            :value="column"
                                        >{{ column }}</option>
                                    </select>

                                    <span class="errors">{{ errors[0] }}</span>
                                </validation-provider>
                                <div class="invalid-feedback">Please provide a valid state.</div>
                            </div>
                            <div class="col-md-6 mb-6">
                                <label for="state">Value to be foreseen</label>
                                <validation-provider
                                    name="Foreseen"
                                    mode="passive"
                                    rules="required"
                                    v-slot="{ errors }"
                                >
                                    <select
                                        class="custom-select d-block w-100"
                                        v-model="params.input"
                                    >
                                        <option value>Choose...</option>
                                        <option
                                            v-for="column in columns"
                                            v-bind:key="column"
                                            :value="column"
                                        >{{ column }}</option>
                                    </select>

                                    <span>{{ errors[0] }}</span>
                                </validation-provider>
                                <div class="invalid-feedback">Please provide a valid state.</div>
                            </div>
                        </div>
                        <div class="row mb-4">
                            <div class="col-md-4 mb-4">
                                <label for="state">Precision</label>
                                <validation-provider
                                    name="Precision"
                                    mode="passive"
                                    rules="required"
                                    v-slot="{ errors }"
                                >
                                    <select
                                        class="custom-select d-block w-100"
                                        v-model="params.precision"
                                    >
                                        <option value="low">Low</option>
                                        <option value="high">High</option>
                                    </select>

                                    <span>{{ errors[0] }}</span>
                                </validation-provider>
                                <div class="invalid-feedback">Please provide a valid state.</div>
                            </div>
                            <div class="col-md-4 mb-4">
                                <label for="state">Unit Time</label>
                                <validation-provider
                                    name="Unit Time"
                                    mode="passive"
                                    rules="required"
                                    v-slot="{ errors }"
                                >
                                    <select
                                        class="custom-select d-block w-100"
                                        v-model="params.seasonality"
                                        @change="setHMOptions"
                                    >
                                        <option value="yearly" selected>Yearly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>

                                    <span>{{ errors[0] }}</span>
                                </validation-provider>
                                <div class="invalid-feedback">Please provide a valid state.</div>
                            </div>
                            <div class="col-md-4 mb-4">
                                <label for="state">How Many?</label>
                                <validation-provider
                                    name="How Many"
                                    mode="passive"
                                    rules="required"
                                    v-slot="{ errors }"
                                >
                                    <select
                                        class="custom-select d-block w-100"
                                        v-model="params.prediction"
                                    >
                                        <option
                                            v-for="option in how_many_options"
                                            v-bind:value="option.id"
                                            :key="option.id"
                                            v-text="option.text"
                                        ></option>
                                    </select>

                                    <span>{{ errors[0] }}</span>
                                </validation-provider>
                                <div class="invalid-feedback">Please provide a valid state.</div>
                            </div>
                        </div>
                        <!-- <b-button variant="dark" block @click="makePrediction"> -->
                        <b-button variant="dark" block type="submit">
                            <b-spinner small v-if="isLoading"></b-spinner>
                            <span v-if="!isLoading">Predict Time Series</span>
                        </b-button>
                    </form>
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
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { endpoint } from '../utils/utils';



extend('required', {
    ...required,
    message: `The {_field_}  field is required`
});

export default {
    name: 'time-series-forecast',
    mounted() {
        this.getDatasets();
    },
    created() {
        this.setHMOptions(); // init with default values (yearly)
    },
    components: {
        ValidationProvider,
        ValidationObserver
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
                prediction: 1
            },
            graph: []
        };
    },
    methods: {
        setHMOptions(event) {
            let c = 0;
            this.how_many_options = []; // reset the select's options
            if (event) {
                // on change was triggered
                if (event.target.value == 'monthly') {
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
            for (let i = 1; i <= c; i++) {
                this.how_many_options.push({ text: `${i}`, id: `${i}` });
            }
        },
        getDatasets() {
            axios
                .get(`${endpoint}/datasets`)
                .then(res => {
                    this.datasets = res.data;
                })
                .catch(err => console.log(err));
        },
        getDatasetColumns() {
            axios
                .post(`${endpoint}/datasets/columns`, {
                    dataset: this.params.filename
                })
                .then(res => {
                    this.columns = res.data.columns;
                })
                .catch(err => console.log(err));
        },
        makePrediction() {
            this.isLoading = true;
            axios
                .post(`${endpoint}/forecasts/sarima`, this.params)
                .then(response => {
                    this.graph = [];
                    this.graph.push(response.data);
                    this.isLoading = false;
                })
                .catch(err => console.log(err));
        }
    },
};
</script>
