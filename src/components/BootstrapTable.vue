<template>
    <progress-overlay :load="running" :error="error">
        <table class="table table-sm table-bordered">
            <thead v-if="headerRows.length>0">
            <header-row :row="headerRows"></header-row>
            </thead>
            <tbody>
            </tbody>
        </table>
    </progress-overlay>
</template>

<script>
    import HeaderRow from "../parts/HeaderRow";
    import {store} from "../store";
    import ProgressOverlay from "./ProgressOverlay";

    export default {
        name: "BootstrapTable",
        components: {ProgressOverlay, HeaderRow},
        props: {columns: {type: Array,}, source: {type: [String, Array], required: true}},
        data() {
            return {levels: 0, loading: false}
        },
        computed: {
            headerRows() {
                return store.mapColumns(this.columns);
            },
            running() {
                return store.running;
            }, error() {
                return store.error;
            }
        },
        methods: {},
        created() {
            console.log(this.headerRows, store.maxDepth);
        }
    }
</script>

<style scoped>

</style>