import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { importConfig } from "@/lib/config-utils";

// eslint-disable-next-line no-undef
const locales = LOCALES.map(locale => locale.split('.js')[0])

Vue.use(VueI18n)

function loadLocaleMessages () {
  const messages = {}

  locales.map(locale => {
    messages[locale] = importConfig(`content/${locale}/messages.json`);
  })

  return messages
}

export default new VueI18n({
  messages: loadLocaleMessages()
})
