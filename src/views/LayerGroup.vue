<template>
  <div>
    <layer-list-controls
      :key="this.$route.params.id"
      :layers="layers"
      @active-layers-change="$emit('active-layers-update', $event)"
      @legend-change="$emit('legend-update', $event)"
    />
  </div>
</template>

<script>
import { LayerListControls } from 'delta-vue-components';

export default {
  components: {
    LayerListControls,
  },
  data() {
    return {
      activeLegend: null
    }
  },
  computed: {
    layers() {
      const { id } = this.$route.params;
      return require(`@/data/${id}`);
    },
  },
};
</script>