<template>
  <div>
    <layer-list
      :layers="layers"
      :active-legend="activeLegend"
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

      // if there is only 1 layer selected or the legend layer is not selected anymore 
      if (layers.length === 1 || !layers.map(layer => layer.id).includes(this.activeLegend)) {
        // if no layer is selected, set active layer to null
        if (!layers.length) {
          this.activeLegend = null
        }

        this.activeLegend = layers[0].id
      }
    },
    handleLegendChange(id) {
      this.activeLegend = id
    }
  },
};
</script>