<template>
    <tbody>
    <data-row v-for="(dt,i) in data" :key="i" :columns="dt"></data-row>
    </tbody>
</template>

<script>
    import DataRow from "./DataRow";

    export default {
        name: "TableBody",
        components: {DataRow},
        props: {data: {type: [Array], required: true}},
        mounted() {
           // console.log(this.data);
        }
    }
</script>

<style scoped>

</style>