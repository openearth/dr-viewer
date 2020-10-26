<template>
  <div>
    <layer-list
      :layers="layers"
      @change="$emit('layersUpdate', $event)"
      @legendChange="$emit('legendUpdate', $event)"
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