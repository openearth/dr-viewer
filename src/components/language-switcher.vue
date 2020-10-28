
<template>
  <div class="mr-0">
    <v-menu offset-y>
      <template v-slot:activator="{ on: menu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              icon
              v-on="{ ...tooltip, ...menu }"
            >
               {{ currentLanguage | capitalize }}
            </v-btn>
          </template>
          <span>Switch Language</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item
          v-for="language in languages"
          :key="language"
          @click="changeLanguage(language)"
        >
          <v-list-item-title>{{ language | capitalize }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import capitalize from '@/lib/capitalize'

export default {
  computed: {
    languages() {
      const keys = Object.keys(this.$i18n.messages)
      return keys.filter(key => key !== this.currentLanguage)
    },
    currentLanguage() {
      return this.$i18n.locale
    }
  },
  filters: {
    capitalize
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>