<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" height="50">
        <div class="row justify-content-center">
            <div class="col-sm-11">
                <div class="">
                    <bootstrap-table :columns="columns" source="https://jsonplaceholder.typicode.com/users"></bootstrap-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BootstrapTable from "@/components/BootstrapTable";

    export default {
        name: 'app',
        components: {BootstrapTable},
        computed: {
            columns() {
                return [];//[{title: 'One'}, {title: 'two', children: [{title: 'A'}, {title: 'B'}, 'anoth one', 'of a kind',['callable',3434,[888,9090],[2212,78787]]]}]
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
