<template>
    <progress-overlay :load="overlay.running" :error="overlay.error">
        <table class="table table-sm table-bordered">
            <thead v-if="headerRows.length>0">
            <header-row :row="headerRows"></header-row>
            </thead>
            <table-body :data="data"></table-body>
        </table>
    </progress-overlay>
</template>

<script>
    import HeaderRow from "../parts/HeaderRow";
    import {store} from "../store";
    import ProgressOverlay from "./ProgressOverlay";
    import TableBody from "../parts/TableBody";

    export default {
        name: "BootstrapTable",
        components: {TableBody, ProgressOverlay, HeaderRow},
        props: {
            columns: {
                type: Array, default() {
                    return []
                }
            },
            source: {type: [String, Array], required: true}
        },
        data() {
            return {levels: 0, loading: false, rawData: [], overlay: {}, data: []}
        },
        computed: {
            headerRows() {
                return store.mapColumns(this.columns);
            },
            running() {
                return store.running;
            }, error() {
                return store.error;
            },
        },
        mounted() {
            this.overlay = store.overlay;
        },
        methods: {},
        created() {
            if (typeof this.source === 'string') {
                store.getData(this.source).then(res => {
                    this.data=res;
                });
            }
        }
    }
</script>

<style scoped>

</style>