// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'ShinyPokeDex',
      meta: [
        {
          name: 'description',
          content: 'Discover detailed information about each Pokémon, including their types, abilities, stats, and more',
        },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: { tailwindcss: {} },
  },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxthub/core'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  vite: {
    build: {
      target: ['es2022', 'edge89', 'firefox89', 'chrome89', 'safari15']
    },
  },
  nitro: {
    esbuild: {
      options: {
        // Node.js のバージョンのみ指定すればOK
        target: 'es2022',
      },
    },
  },
  runtimeConfig: {
    pokeapi: {
      baseURL: 'https://pokeapi.co/api/v2/',
    },
  },
  experimental: {
    viewTransition: true,
  },
})