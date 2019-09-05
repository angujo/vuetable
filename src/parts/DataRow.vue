<template>
    <tr>
        <td v-for="(column,i) in theColumns" :key="i">{{column}}</td>
    </tr>
</template>

<script>
    export default {
        name: "DataRow",
        props: {columns: {type: [Array, Object], required: true}},
        computed: {
            theColumns() {
                if (Array.isArray(this.columns)) return this.columns;
                return [];
            }
        }
    }
</script>

<style scoped>

</style>