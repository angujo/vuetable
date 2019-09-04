<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <div class="row justify-content-center">
            <div class="col-sm-12 col-md-8">
                <bootstrap-table :columns="columns"></bootstrap-table>
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
                return [{title: 'One'}, {title: 'two', children: [{title: 'A'}, {title: 'B'}, 'anoth one', 'of a kind',['callable',3434]]}]
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
