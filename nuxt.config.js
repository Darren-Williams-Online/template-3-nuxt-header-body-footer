// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon', 
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui'
  ],

  // AWS Amplify configuration
  nitro: {
    preset: 'aws-amplify',
    aws: {
      region: process.env.AWS_REGION || 'us-east-1'
    }
  },

  // ISR configuration for dynamic pages
  routeRules: {
    '/user-pages/**': { 
      isr: true,
      headers: { 
        'Cache-Control': 'public, max-age=3600, s-maxage=86400' 
      }
    },
    '/api/**': { 
      cors: true,
      headers: { 'Cache-Control': 'no-cache' }
    }
  },

  // Runtime configuration
  runtimeConfig: {
    // Server-side environment variables
    awsRegion: process.env.AWS_REGION,
    dynamodbTable: process.env.DYNAMODB_TABLE_NAME,
    
    public: {
      // Client-side environment variables
      amplifyAppId: process.env.AMPLIFY_APP_ID
    }
  },

  // CSS configuration (Nuxt UI already includes Tailwind)
  css: ['~/assets/css/main.css']
})
