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

<script>
export default {
    name: "StationsTable",
    data() {
        return {
            funkInstance: {},
            stations: [],
        };
    },
    mounted() {
        this.funkInstance = this.$funk.create({ urlOverride: "ws://localhost:612", debugLogging: true });
        this.funkInstance.on("fullData", (fullData) => {
            this.stations = fullData;
        });
        this.funkInstance.on("stationChanged", (station) => {
            let oldStationIndex = this.stations.findIndex((s) => s.id === station.id);
            this.stations.splice(oldStationIndex, 1, { ...this.stations[oldStationIndex], ...station });
        });
    },
};
</script>
