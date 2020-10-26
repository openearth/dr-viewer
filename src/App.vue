<template>
  <v-app>
    <app-header />
    <app-sidebar
      @layersUpdate="layers = $event"
      @legendUpdate="legendLayer = $event"
    />
    <v-main>
      <mapbox-map
        :layers="layers"
        :legend-layer="legendLayer"
      />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar";
import MapboxMap from "@/components/mapbox-map";

export default {
  name: "App",
  components: {
    AppHeader,
    AppSidebar,
    MapboxMap,
  },
  data() {
    return {
      layers: [],
      legendLayer: null
    }
  }
};
</script>
