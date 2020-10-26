<template>
  <div class="pa-4 home d-flex flex-column">
    <div>
      <h2 class="h2">{{ $t('introduction') }}</h2>

      <v-divider class="mt-4 mb-4" />
    </div>

    <div v-html="content" />

    <div class="d-flex pt-4">
      <v-btn class="primary ml-auto">{{ $t('get_started') }}</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    content() {
      return require(`@/content/${this.$i18n.locale}/introduction.md`)
    }
  }
};
</script>