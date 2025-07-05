<template>
  <TemplateRenderer 
    template-id="3"
    :page-content="pageContent"
  />
</template>

<script setup>
// Import static content
import homepageContent from '~/content/pages/homepage.json'

// SEO configuration for Template 3
useSeoMeta({
  title: 'Template 3: Header + Body + Footer Layout',
  ogTitle: 'Template 3: Header + Body + Footer Layout',
  description: 'A complete Nuxt.js template featuring header navigation, main content area, and footer section.',
  ogDescription: 'A complete Nuxt.js template featuring header navigation, main content area, and footer section.',
  ogImage: '/og-template-3.jpg',
  twitterCard: 'summary_large_image',
})

// Use static content from JSON
const pageContent = ref(homepageContent)
</script>
