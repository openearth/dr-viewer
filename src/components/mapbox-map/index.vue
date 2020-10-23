<template>
  <v-mapbox
    :access-token="accessToken"
    :map-style="mapConfig.style"
    :center="mapConfig.center"
    :zoom="mapConfig.zoom"
    :min-zoom="5"
    @mb-created="onMapCreated"
    id="map"
    ref="map"
  >
    <v-mapbox-navigation-control
      position="bottom-right"
    />
    <!-- custom map components -->
    <map-control-baselayer
      :layers="mapBaseLayers" 
      position="bottom-right"
    />
    <map-layer
      v-for="layer in wmsLayers"
      :key="layer.id"
      :options="layer"
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
import buildWmsLayer from '@/lib/build-wms-layer';
import MapControlBaselayer from './map-control-baselayer'
import MapLayer from './map-layer'

export default {
  components: {
    MapControlBaselayer,
    MapLayer
  },
  props: {
    layers: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    layers() {
      this.sortLayers()
    }
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
    },
    wmsLayers() {
      return this.layers.map(buildWmsLayer)
    },
  },
  methods: {
    onMapCreated(map) {
      this.$root.map = map;
      
      map.on("load", () => {
        this.$root.mapLoaded = true;
      });
    },
    // makes sure the layers are rendered in the order or the wmsLayers array
    // position 1 gets rendered on top, 2 below that etc.
    sortLayers() {
      const { map } = this.$root

      // processing needs te be done in order, otherwise the internal layer order
      // of mapbox will be messed up
      this.layers.map(async (layer, index) => {
        const before = this.layers[index - 1] && this.layers[index - 1].id

        // wait until layers are both loaded before proceeding
        await Promise.all([layer.id, before].map(async id => {
          await this.layerLoaded(id) 
        }))

        map.moveLayer(layer.id, before);
      })
    },
    // listens for when a layer is loaded by mapbox
    async layerLoaded(id) {
      const { map } = this.$root

      if (!map.getLayer(id)) {
        // we need to wait for when a layer is loaded, hence the Promise
        await new Promise((resolve) => {
          this.cb = e => {
            // check if the loaded layer has the current id
            if (e.sourceDataType === 'metadata' && e.sourceId === id) {
              resolve()
            }

            // remove callback since it will likely be re-added later
            map.off('sourcedata', this.cb)
          }

          // add callback when sourcedata is updated
          map.on('sourcedata', this.cb);
        })
      }
    }
  }
};
</script>

<style>
.mapboxgl-map {
  height: 100%
}
</style>