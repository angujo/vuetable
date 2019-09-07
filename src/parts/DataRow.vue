<template>
    <tr>
        <template v-for="(column,i) in theColumns">
            <data-cell :key="i" :cell-data="column" :header-column="headers[i]"></data-cell>
        </template>
    </tr>
</template>

<script>
    import DataCell from "./DataCell";
    import {store} from "../store";

    export default {
        name: "DataRow",
        components: {DataCell},
        props: {columns: {type: [Array, Object], required: true}},
        computed: {
            headers() {
                return store.dColumns;
            },
            theColumns() {
                if (Array.isArray(this.columns)) return this.columns;
                //  console.log(Object.values(this.columns));
                if (Object(this.columns) === this.columns) {
                    return store.dColumns.map(dc => this.matchColumn(this.columns, dc));
                    // return Object.values(this.columns);
                }
                return [];
            }
        }, mounted() {
            // console.log(store.columns);
        }, methods: {
            matchColumn(obj, dc) {
                if (Object(obj) !== obj) {
                    if (dc.field === obj) return obj;
                    return null;
                }
                for (var i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        // if (Object(obj[i]) !== obj[i]) {
                        if (dc.field === i) return obj[i];
                        // }
                        if (Object(obj[i]) === obj[i]) {
                            let v = this.matchColumn(obj[i], dc);
                            if (v) return v;
                        }
                    }
                }
                return null;
            }
        }
    }
</script>

<style scoped>

</style>