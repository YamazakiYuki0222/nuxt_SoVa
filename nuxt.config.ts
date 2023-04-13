export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
  ],
  app: {
    head: {
      title: '本日の提供',
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '本日の提供です' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      //script: [{ src: '/js/jquery-3.3.1.min.js' }, { src: '/js/slick/slick.min.js' }],
    }
  },
  //css: ['@/assets/css/reset.css', '@/assets/css/style.css'],
})
