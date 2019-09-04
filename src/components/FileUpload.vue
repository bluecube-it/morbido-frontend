<template>
    <file-pond
        name="dataset"
        ref="pond"
        label-idle="Drop files here..."
        v-bind:allow-multiple="true"
        accepted-file-types="text/csv"
        server="/upload/dataset"
        v-on:init="handleFilePondInit"
    />
</template>

<script>
// Import Vue FilePond
import vueFilePond from 'vue-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType);

export default {
    name: 'file-upload',
    methods: {
        handleFilePondInit: function() {
            // FilePond instance methods are available on `this.$refs.pond`
        }
    },
    components: {
        FilePond
    }
};
</script>