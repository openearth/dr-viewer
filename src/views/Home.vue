<template>
  <div class="home">
    <mapbox-map /> 
  </div>
</template>

<script>
import MapboxMap from '@/components/mapbox-map'

export default {
  name: 'Home',
  components: {
    MapboxMap
  }
}
</script>

<style>
.home {
  height: 100%;
}
</style>