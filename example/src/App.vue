<template>
    <div id="app">
        <StationsTable />
    </div>
</template>

<script>
import StationsTable from "./components/StationsTable.vue";

export default {
    name: "App",
    components: {
        StationsTable,
    },
};
</script>

<style>
#app {
    font-family: sans-serif;
}
</style>
