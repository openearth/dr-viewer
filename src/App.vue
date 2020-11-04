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
    <legal-dialog />
  </v-app>
</template>

<script>
import AppHeader from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar";
import MapboxMap from "@/components/mapbox-map";
import LegalDialog from "@/components/legal-dialog";

export default {
  name: "App",
  components: {
    AppHeader,
    AppSidebar,
    MapboxMap,
    LegalDialog
  },
  data() {
    return {
      layers: [],
      legendLayer: null
    }
  },
  watch: {
    '$route'() {
      this.reset()
    }
  },
  methods: {
    reset() {
      this.layers = []
      this.legendLayer = []
    }
  }
};
</script>
