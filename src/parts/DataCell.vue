<template>
    <td :class="headerCol.titleClass">
        <span v-if="headerCol.component" :is="headerCol.component"></span>
        <span v-else v-html="cellData"></span>
    </td>
</template>

<script>
    import {store} from "../store";

    export default {
        name: "DataCell",
        props: {cellData: {type: [Number, Object, String], required: true}, headerColumn: {type: Object}},
        computed: {
            headerCol() {
                return Object.assign({}, store.column, this.headerColumn)
            }
        },
        mounted() {
            // console.log(this.cellData);
        }
    }
</script>

<style scoped>

</style>