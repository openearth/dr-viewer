<template>
  <div>
    <layer-list
      :key="this.$route.params.id"
      :layers="layers"
      @change="$emit('active-layers-update', $event)"
      @legendChange="$emit('legend-update', $event)"
    />
  </div>
</template>

<script>
import LayerList from '@/components/layer-list';

export default {
  components: {
    LayerList,
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