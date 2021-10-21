<template>
    <table>
        <thead>
            <tr>
                <th>slug</th>
                <th>full name</th>
                <th>logo</th>
                <th>website</th>
                <th>listening</th>
                <th>current song</th>
                <th>current presenter</th>
                <th>player</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="station in stations" :key="station.id">
                <td>{{ station.slug }}</td>
                <td>{{ station.fullName }}</td>
                <td><img :src="station.logo" height="50px" /></td>
                <td><a :href="station.website" target="__blank">click me</a></td>
                <td>{{ station.listening || "No data" }}</td>
                <td><img v-if="station.playing && station.playing.cover" :src="station.playing.cover" height="50px" /> {{ station.playing ? `${station.playing.artist} - ${station.playing.title}` : "No data" }}</td>
                <td><img v-if="station.presenter && station.presenter.avatar" :src="station.presenter.avatar" height="50px" /> {{ station.presenter.name || "No data" }}</td>
                <td><audio :src="station.streamUrl" controls></audio></td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import Vue from "vue";
import { FunkStation } from "@statio/funk.js";

export default Vue.extend({
    name: "StationsTable",
    data() {
        const data: { funkInstance: any; stations: FunkStation[] } = {
            funkInstance: {},
            stations: [],
        };
        return data;
    },
    mounted() {
        /// @ts-ignore
        this.funkInstance = this.$funk({ urlOverride: "ws://localhost:612", debugLogging: true });
        this.funkInstance.on("fullData", (fullData: FunkStation[]) => {
            this.stations = fullData;
        });
        this.funkInstance.on("stationChanged", (station: FunkStation) => {
            let oldStationIndex = this.stations.findIndex((s) => s.id === station.id);
            this.stations.splice(oldStationIndex, 1, { ...this.stations[oldStationIndex], ...station });
        });
    },
});
</script>
