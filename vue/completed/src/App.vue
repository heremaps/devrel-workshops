<template>
    <div id="app">
        <HereMap ref="map" appId="APP-ID-HERE" appCode="APP-CODE-HERE" />
    </div>
</template>

<script>
    import HereMap from "./components/HereMap.vue"

    export default {
        name: "app",
        components: {
            HereMap
        },
        async mounted() {
            let map = this.$refs.map;
            let tracy = await map.geocode("Tracy, CA");
            let manteca = await map.geocode("Manteca, CA");
            let modesto = await map.geocode("Modesto, CA");
            map.dropMarker(tracy.Latitude, tracy.Longitude);
            map.dropMarker(manteca.Latitude, manteca.Longitude);
            map.dropMarker(modesto.Latitude, modesto.Longitude);
            map.drawLinesBetweenMarkers();
            map.drawRoute(tracy, modesto);
        }
    }
</script>

<style></style>
