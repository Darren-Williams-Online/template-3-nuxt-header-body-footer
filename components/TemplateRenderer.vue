<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Template 3: Header + Body + Footer -->
    <div class="flex flex-col min-h-screen">
      <HeaderComponent :template-theme="`template${templateId}`" />
      <main class="flex-1 container mx-auto px-4 py-8">
        <MainContentComponent 
          v-for="component in pageContent.components" 
          :key="component.componentId"
          :component-id="component.componentId"
          :template-theme="`template${templateId}`"
        />
      </main>
      <FooterComponent :template-theme="`template${templateId}`" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  templateId: {
    type: String,
    required: true
  },
  pageContent: {
    type: Object,
    default: () => ({
      components: [],
      seo: {}
    })
  },
  componentLibrary: {
    type: Object,
    default: () => ({})
  }
})
</script>
