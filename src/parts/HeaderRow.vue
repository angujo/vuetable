<template>
    <fragment>
        <tr>
            <th v-for="rw in row" :key="JSON.stringify(rw)" v-html="rw.title" :rowspan="rw.rowspan" :colspan="rw.colspan"></th>
        </tr>
        <template v-if="otherRows.length>0">
            <header-row :row="otherRows"></header-row>
        </template>
    </fragment>
</template>

<script>
    import {Fragment} from 'vue-fragment'

    export default {
        name: "HeaderRow",
        props: {row: {type: Array, required: true}},
        computed: {
            otherRows() {
              return   this.row.filter(r => r.children.length > 0).map(r => r.children).flat(1);
            }
        },
        components: {Fragment}
    }
</script>

<style scoped>

</style>