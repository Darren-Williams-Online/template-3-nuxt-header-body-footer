<template>
  <header :class="headerConfig.styling.classes">
    <div class="container mx-auto flex items-center justify-between p-4">
      <div class="flex items-center space-x-3">
        <img 
          v-if="headerConfig.content.logo" 
          :src="getImageUrl(headerConfig.content.logo)" 
          :alt="headerConfig.content.title" 
          class="h-8 w-8" 
        />
        <div>
          <h1 :class="headerConfig.styling.titleClasses">
            {{ headerConfig.content.title }}
          </h1>
          <p v-if="headerConfig.content.subtitle" :class="headerConfig.styling.subtitleClasses">
            {{ headerConfig.content.subtitle }}
          </p>
        </div>
      </div>
      
      <nav class="hidden md:flex space-x-6">
        <NuxtLink 
          v-for="item in headerConfig.content.navigation" 
          :key="item.href" 
          :to="item.href" 
          :class="navLinkClasses"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
      
      <!-- Mobile menu button -->
      <button 
        v-if="headerConfig.content.navigation?.length > 0"
        @click="toggleMobileMenu"
        class="md:hidden p-2 rounded-md"
        :class="headerConfig.styling.mobileButtonClasses"
      >
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    
    <!-- Mobile menu -->
    <div v-show="showMobileMenu" class="md:hidden border-t" :class="headerConfig.styling.mobileMenuClasses">
      <div class="px-4 py-2 space-y-1">
        <NuxtLink 
          v-for="item in headerConfig.content.navigation" 
          :key="item.href" 
          :to="item.href" 
          class="block px-3 py-2 rounded-md"
          :class="headerConfig.styling.mobileNavClasses"
          @click="closeMobileMenu"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue'
import headerConfig from '~/content/components/header.json'

const showMobileMenu = ref(false)

// Props for template-specific overrides
const props = defineProps({
  templateTheme: {
    type: String,
    default: 'default'
  },
  customConfig: {
    type: Object,
    default: () => ({})
  }
})

// Computed styles that can be overridden by template themes
const navLinkClasses = computed(() => {
  const base = headerConfig.styling.navLink?.base || 'text-gray-600 hover:text-gray-900'
  const theme = headerConfig.styling.navLink?.themes?.[props.templateTheme]
  return theme ? `${base} ${theme}` : base
})

// Image URL resolver - handles local SVG icons vs S3 images
const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  
  // Local SVG icons (small, stored in Git)
  if (imagePath.endsWith('.svg') && imagePath.startsWith('/')) {
    return imagePath
  }
  
  // S3 images (large, stored in client's S3)
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  // Default to S3 with client's domain
  const s3BaseUrl = headerConfig.imageConfig?.s3BaseUrl || 'https://client-assets.s3.amazonaws.com'
  return `${s3BaseUrl}/${imagePath.replace(/^\//, '')}`
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

// Merge custom config with default config
const mergedConfig = computed(() => {
  return {
    ...headerConfig,
    ...props.customConfig
  }
})
</script>
