// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: ['@hypernym/nuxt-gsap', '@vueuse/nuxt','@nuxtjs/seo'],
  gsap: {
    extraPlugins: {
      scrollTrigger: true
    }
  },
  site: {
    indexable: true,
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://api.fontshare.com/v2/css?f[]=satoshi@400,401,500,501,700&display=swap'
        },
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico"
        }
      ],
      bodyAttrs: {
        'data-scrolling-started': 'false',
        'data-scrolling-direction': 'up'
      },
      htmlAttrs: {
        lang: "en",
      }
    }
  }
})
