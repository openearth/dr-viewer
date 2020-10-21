<template>
  <v-app>
    <app-header />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '@/components/app-header'

export default {
  name: 'App',
  components: {
    AppHeader
  },
};
</script>
