<template>
  <v-app>
    <app-header />
    <app-sidebar @layersUpdate="layers = $event" />
    <v-main>
      <mapbox-map :layers="layers" />
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
      layers: []
    }
  }
};
</script>
