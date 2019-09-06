<template>
    <td>{{cellData}}</td>
</template>

<script>
    export default {
        name: "DataCell",
        props: {cellData: {type: [Number, Object, String], required: true}},
        mounted() {
           // console.log(this.cellData);
        }
    }
</script>

<style scoped>

</style>