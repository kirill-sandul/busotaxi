// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/image', "@pinia/nuxt"],
  app: {
    head: {
      title: 'BusoTaxi - ayudas de transporte en Europa',
      htmlAttrs: {
        lang: 'es'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ]
    },
  },
  css: [
    '~/assets/scss/main.scss'
  ],
  experimental: {
    renderJsonPayloads: false
  }
})