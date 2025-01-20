import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  extends: [
    './home/nuxt.config.ts',
    './account/nuxt.config.ts',
    './kakaoAuthentication/nuxt.config.ts',
    './car/nuxt.config.ts',
    './cart/nuxt.config.ts',
    './board/nuxt.config.ts',
    './payments/nuxt.config.ts',
    './order/nuxt.config.ts',
  ],

  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
  ],

  build: {
    transpile: [
      'vuetify',
      'vue-toastification'
    ]
  },

  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
  },

  components: [
    {
      path: '~/navigationBar', extensions: ['vue'],
    },
  ],

  modules: [
    'vuetify-nuxt-module',
    '@pinia/nuxt',
    '~/home/index.ts',
    '~/account/index.ts',
    '~/kakaoAuthentication/index.ts',
    '~/car/index.ts',
    '~/cart/index.ts',
    '~/board/index.ts',
    '~/payments/index.ts',
    '~/order/index.ts',
  ],

  imports: {
    dirs: ['./stores']
  },

  runtimeConfig: {
    public: {
      MAIN_API_URL: process.env.VUE_APP_BASE_URL,
      TOSS_CLIENT_KEY : process.env.TOSS_CLIENT_KEY,
      TOSS_SECRET_KEY : process.env.TOSS_SECRET_KEY,
    }
  },
})