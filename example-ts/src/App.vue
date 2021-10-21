<template>
    <div id="app">
        <StationsTable />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import StationsTable from "./components/StationsTable.vue";

export default Vue.extend({
    name: "App",
    components: {
        StationsTable,
    },
});
</script>

<style>
#app {
    font-family: sans-serif;
}
</style>
