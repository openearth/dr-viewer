<template>
  <v-app-bar app color="primary" dark clipped-left>
    <v-toolbar-title>
      <router-link to="/" class="white--text text-decoration-none"
        >DR</router-link
      >
    </v-toolbar-title>

    <v-spacer />

    <v-tabs background-color="primary" dark right style="width: auto">
      <v-tab :to="{ name: 'Introduction' }" exact>
        {{ $t('introduction') }}
      </v-tab>
      <v-tab
        v-for="page in pages"
        :key="page.id"
        :to="{
          name: 'LayerGroup',
          params: { id: page.id },
        }"
      >
        {{ page.name }}
      </v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script>
import pages from '@/lib/get-data-pages'

export default {
  data() {
    return {
      pages 
    };
  },
};
</script>