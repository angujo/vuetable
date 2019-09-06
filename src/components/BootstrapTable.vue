<template>
    <div>
        <div class="table-responsive w-100">
            <progress-overlay :load="overlay.running" :error="overlay.error">
                <table class="table table-sm table-bordered">
                    <thead v-if="headerRows.length>0">
                    <header-row :row="headerRows"></header-row>
                    </thead>
                    <table-body :data="data"></table-body>
                </table>
            </progress-overlay>
        </div>
        <pagination @change="paginated"></pagination>
    </div>
</template>

<script>
    import HeaderRow from "../parts/HeaderRow";
    import {store} from "../store";
    import ProgressOverlay from "./ProgressOverlay";
    import TableBody from "../parts/TableBody";
    import Pagination from "./Pagination";

    export default {
        name: "BootstrapTable",
        components: {Pagination, TableBody, ProgressOverlay, HeaderRow},
        props: {
            columns: {
                type: Array, default() {
                    return []
                }
            },
            source: {type: [String, Array], required: true}
        },
        data() {
            return {levels: 0, loading: false, overlay: {}, data: [], cols: this.columns}
        },
        computed: {
            headerRows() {
                return store.mapColumns(this.cols);
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
        methods: {
            paginated(source) {
                this.getURLData(source);
            },
            getURLData(url) {
                store.fathomUrl(url);
                store.getData(store.insertParam(url, 'per_page', store.config.per_page)).then(res => {
                    this.data = res;
                    if (this.headerRows.length <= 0 && res.length > 0) {
                        store.fromData = true;
                        res.forEach(r => {
                            this.cols = store.columnFromObject(r, this.cols);
                        });
                    }
                });
            }
        },
        created() {
            if (typeof this.source === 'string') {
                store.config.source_url = this.source;
                this.getURLData(this.source);
            }
        },
    }
</script>

<style scoped>

</style>