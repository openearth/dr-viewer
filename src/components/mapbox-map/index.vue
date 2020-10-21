<template>
  <v-mapbox
    :access-token="accessToken"
    :map-style="mapConfig.style"
    :center="mapConfig.center"
    :zoom="mapConfig.zoom"
    :min-zoom="5"
    id="map"
    ref="map"
  >
    <v-mapbox-navigation-control
      position="bottom-right"
    />
    <map-control-baselayer
      :layers="mapBaseLayers" 
      position="bottom-right"
    />
  </v-mapbox>
</template>

<script>
import {
  MAP_CENTER,
  MAP_ZOOM,
  MAP_BASELAYERS,
  MAP_BASELAYER_DEFAULT,
} from '@/lib/constants';
import MapControlBaselayer from './map-control-baselayer'

export default {
  components: {
    MapControlBaselayer
  },
  computed: {
    accessToken() {
      return process.env.VUE_APP_MAPBOX_TOKEN
    },
    mapConfig() {
      return {
        center: MAP_CENTER,
        zoom: MAP_ZOOM,
        style: MAP_BASELAYER_DEFAULT.style
      };
    },
    mapBaseLayers() {
      return MAP_BASELAYERS;
    }
  }
};
</script>

<style>
.mapboxgl-map {
  height: 100%
}
</style>