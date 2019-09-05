<template>
    <div class="ang-vuetable">
        <slot></slot>
        <div class="ang-overlay d-flex justify-content-center align-items-center" v-if="show">
            <div v-if="error" class="alert alert-danger p-1 small" v-html="error"></div>
            <img v-else src="../assets/spin.gif">
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProgressOverlay",
        props: {load: {type: Boolean, default: true}, error: {type: String, default: ''}},
        computed: {
            show() {
                return true === this.load || this.error.toString().trim().length > 0
            }
        }
    }
</script>

<style scoped>
    .ang-vuetable {
        position: relative;
        min-height: 20px;
        min-width: 20px;
    }

    .ang-overlay {
        position: absolute;
        width: 100%;
        background: #ffffffd1;
        bottom: 0;
        height: 100%;
        top: 0;
    }
</style>