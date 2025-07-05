<template>
  <div v-if="componentData" :class="componentData.styling?.containerClasses">
    <!-- Hero Section -->
    <section v-if="componentData.content.type === 'hero'" class="text-center py-16">
      <div v-if="componentData.content.backgroundImage" 
           class="absolute inset-0 bg-cover bg-center"
           :style="{ backgroundImage: `url(${getImageUrl(componentData.content.backgroundImage)})` }">
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div class="relative z-10">
        <h1 :class="componentData.styling?.titleClasses || 'text-4xl font-bold text-gray-800 mb-4'">
          {{ componentData.content.title }}
        </h1>
        <p v-if="componentData.content.subtitle" 
           :class="componentData.styling?.subtitleClasses || 'text-xl text-gray-600 max-w-3xl mx-auto mb-8'">
          {{ componentData.content.subtitle }}
        </p>
        <p v-if="componentData.content.description" 
           :class="componentData.styling?.descriptionClasses || 'text-lg text-gray-700 max-w-2xl mx-auto mb-8'">
          {{ componentData.content.description }}
        </p>
        <div v-if="componentData.content.cta" class="space-x-4">
          <NuxtLink 
            :to="componentData.content.cta.link" 
            :class="componentData.styling?.ctaClasses || 'inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors'"
          >
            {{ componentData.content.cta.text }}
          </NuxtLink>
          <NuxtLink 
            v-if="componentData.content.secondaryCta"
            :to="componentData.content.secondaryCta.link" 
            :class="componentData.styling?.secondaryCtaClasses || 'inline-block border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors'"
          >
            {{ componentData.content.secondaryCta.text }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section v-else-if="componentData.content.type === 'features'" class="py-12">
      <div class="text-center mb-12">
        <h2 :class="componentData.styling?.sectionTitleClasses || 'text-3xl font-bold text-gray-800 mb-4'">
          {{ componentData.content.title }}
        </h2>
        <p v-if="componentData.content.description" 
           :class="componentData.styling?.sectionDescClasses || 'text-lg text-gray-600 max-w-2xl mx-auto'">
          {{ componentData.content.description }}
        </p>
      </div>
      <div :class="componentData.styling?.gridClasses || 'grid grid-cols-1 md:grid-cols-3 gap-8'">
        <div v-for="feature in componentData.content.features" 
             :key="feature.title" 
             :class="componentData.styling?.featureCardClasses || 'bg-white p-6 rounded-lg shadow-sm border'">
          <img v-if="feature.icon" 
               :src="getImageUrl(feature.icon)" 
               :alt="feature.title"
               class="h-12 w-12 mb-4" />
          <h3 :class="componentData.styling?.featureTitleClasses || 'text-lg font-semibold text-gray-800 mb-3'">
            {{ feature.title }}
          </h3>
          <p :class="componentData.styling?.featureDescClasses || 'text-gray-600'">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Content Block -->
    <section v-else-if="componentData.content.type === 'content'" class="py-12">
      <div class="max-w-4xl mx-auto">
        <h2 v-if="componentData.content.title" 
            :class="componentData.styling?.titleClasses || 'text-3xl font-bold text-gray-800 mb-6'">
          {{ componentData.content.title }}
        </h2>
        <div v-if="componentData.content.image" class="mb-8">
          <img :src="getImageUrl(componentData.content.image)" 
               :alt="componentData.content.title"
               :class="componentData.styling?.imageClasses || 'w-full h-64 object-cover rounded-lg'" />
        </div>
        <div v-html="componentData.content.body" 
             :class="componentData.styling?.bodyClasses || 'prose prose-lg max-w-none'">
        </div>
        <div v-if="componentData.content.cta" class="mt-8">
          <NuxtLink 
            :to="componentData.content.cta.link" 
            :class="componentData.styling?.ctaClasses || 'inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors'"
          >
            {{ componentData.content.cta.text }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Default/Fallback Content -->
    <section v-else class="py-12">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          {{ componentData.content.title || 'Content Block' }}
        </h2>
        <p class="text-gray-600 mb-6">
          {{ componentData.content.description || 'This is a placeholder content block. Replace with your actual content.' }}
        </p>
        <div v-if="componentData.content.cta">
          <NuxtLink 
            :to="componentData.content.cta.link || '#'" 
            class="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {{ componentData.content.cta.text || 'Learn More' }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
  
  <!-- Fallback if no component data -->
  <div v-else class="py-12 text-center">
    <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8">
      <h3 class="text-lg font-medium text-gray-800 mb-2">Content Component</h3>
      <p class="text-gray-600">Component "{{ componentId }}" not found. Please check your content configuration.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  componentId: {
    type: String,
    required: true
  },
  templateTheme: {
    type: String,
    default: 'default'
  }
})

// Load component data from JSON file
const componentData = computed(() => {
  try {
    // Try to import the component data
    // In a real implementation, this would be dynamic based on componentId
    const mainContentData = require('~/content/components/main-content.json')
    return mainContentData
  } catch (error) {
    console.warn(`Could not load component data for ${props.componentId}:`, error)
    return null
  }
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
  const s3BaseUrl = 'https://client-assets.yourdomain.com'
  return `${s3BaseUrl}/${imagePath.replace(/^\//, '')}`
}
</script>
