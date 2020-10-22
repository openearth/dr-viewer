<template>
  <div>
    <layer-list :layers="layers" @change="handleChange" />
  </div>
</template>

<script>
import LayerList from "@/components/layer-list";

export default {
  components: {
    LayerList,
  },
  computed: {
    layers() {
      const { id } = this.$route.params;
      return require(`@/data/${id}`);
    },
  },
  methods: {
    handleChange(e) {
      console.log(e);
    },
  },
};
</script>