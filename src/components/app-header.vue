<template>
  <v-app-bar app color="primary" dark clipped-left>
    <v-toolbar-title>
      <router-link to="/" class="white--text text-decoration-none"
        >DR</router-link
      >
    </v-toolbar-title>

    <v-spacer />

    <v-tabs background-color="primary" dark right style="width: auto">
      <v-tab :to="{ name: 'Introduction' }">
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
import extractExtension from '@/lib/extract-extension';
import toRoute from '@/lib/to-route';

// eslint-disable-next-line
const pages = LAYER_PAGES.map(extractExtension).map(toRoute);

export default {
  data() {
    return {
      pages,
    };
  },
};
</script>