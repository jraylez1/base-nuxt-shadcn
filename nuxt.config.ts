// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxt/icon', '@pinia/nuxt', '@nuxtjs/i18n'],
  devServer: {
    port: 8081,
    host: 'http://localhost/'
  },
  i18n: {
    lazy: true,
    langDir: 'locales',
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        file: 'en.json'
      },
      {
        code: 'vi',
        file: 'vi.json'
      }
    ],
    defaultLocale: 'vi'
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
})
