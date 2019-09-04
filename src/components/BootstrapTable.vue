<template>
    <table class="table">
        <thead>
        <header-row :row="headerRows"></header-row>
        </thead>
        <tbody>
        </tbody>
    </table>
</template>

<script>
    import HeaderRow from "../parts/HeaderRow";
    import {store} from "../store";

    export default {
        name: "BootstrapTable",
        components: {HeaderRow},
        props: {columns: {type: Array, required: true}},
        data() {
            return {levels: 0}
        },
        computed: {
            headerRows() {
                return store.mapColumns(this.columns);
            }
        },
        methods: {},
        created() {
            console.log(this.headerRows,store.maxDepth);
        }
    }
</script>

<style scoped>

</style>