<template>
  <div>
    <layer-list
      :layers="layers"
      @change="handleChange"
      @legendChange="handleLegendChange"
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
  watch: {
    activeLegend(value) {
      this.$emit('legendUpdate', value)
    }
  },
  methods: {
    handleChange(layers) {
      this.$emit('layersUpdate', layers)
    },
    handleLegendChange(id) {
      this.activeLegend = id
    }
  },
};
</script>