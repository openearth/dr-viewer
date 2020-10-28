<template>
  <v-app-bar app color="primary" dark clipped-left>
    <v-toolbar-title>
      <router-link
        to="/"
        class="white--text text-decoration-none"
      >{{ title }}</router-link>
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

    <template v-if="languages.length > 1">
      <v-divider
        class="mx-4"
        vertical
      />
      <language-switcher />
    </template>
  </v-app-bar>
</template>

<script>
import LanguageSwitcher from '@/components/language-switcher'
import { config } from '@/lib/config-utils';
import pages from '@/lib/get-data-pages';

export default {
  components: {
    LanguageSwitcher
  },
  data() {
    return {
      pages,
      title: config.shortName,
    };
  },
  computed: {
    languages() {
      return Object.keys(this.$i18n.messages)
    },
  }
};
</script>