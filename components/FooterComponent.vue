<template>
  <footer :class="footerConfig.styling.classes">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Company Info -->
        <div>
          <div v-if="footerConfig.content.logo" class="flex items-center space-x-3 mb-4">
            <img 
              :src="getImageUrl(footerConfig.content.logo)" 
              :alt="footerConfig.content.companyName" 
              class="h-8 w-8"
            />
            <h3 :class="footerConfig.styling.companyNameClasses">
              {{ footerConfig.content.companyName }}
            </h3>
          </div>
          <h3 v-else :class="footerConfig.styling.companyNameClasses">
            {{ footerConfig.content.companyName }}
          </h3>
          <p :class="footerConfig.styling.descriptionClasses">
            {{ footerConfig.content.description }}
          </p>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h4 :class="footerConfig.styling.sectionTitleClasses">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="link in footerConfig.content.quickLinks" :key="link.href">
              <NuxtLink :to="link.href" :class="footerConfig.styling.linkClasses">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- Contact Info -->
        <div>
          <h4 :class="footerConfig.styling.sectionTitleClasses">Contact Info</h4>
          <div class="space-y-2">
            <p v-if="footerConfig.content.contact.email" :class="footerConfig.styling.contactClasses">
              <span class="font-medium">Email:</span> 
              <a :href="`mailto:${footerConfig.content.contact.email}`" :class="footerConfig.styling.linkClasses">
                {{ footerConfig.content.contact.email }}
              </a>
            </p>
            <p v-if="footerConfig.content.contact.phone" :class="footerConfig.styling.contactClasses">
              <span class="font-medium">Phone:</span> 
              <a :href="`tel:${footerConfig.content.contact.phone}`" :class="footerConfig.styling.linkClasses">
                {{ footerConfig.content.contact.phone }}
              </a>
            </p>
            <p v-if="footerConfig.content.contact.address" :class="footerConfig.styling.contactClasses">
              <span class="font-medium">Address:</span> {{ footerConfig.content.contact.address }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- Social Media Links -->
      <div v-if="footerConfig.content.socialMedia?.length > 0" class="mt-8 pt-8 border-t" :class="footerConfig.styling.borderClasses">
        <div class="flex justify-center space-x-6">
          <a 
            v-for="social in footerConfig.content.socialMedia" 
            :key="social.platform"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            :class="footerConfig.styling.socialLinkClasses"
            :title="social.platform"
          >
            <img 
              :src="getImageUrl(social.icon)" 
              :alt="social.platform" 
              class="h-6 w-6"
            />
          </a>
        </div>
      </div>
      
      <!-- Copyright -->
      <div class="mt-8 pt-8 text-center border-t" :class="footerConfig.styling.borderClasses">
        <p :class="footerConfig.styling.copyrightClasses">
          © {{ currentYear }} {{ footerConfig.content.companyName }}. {{ footerConfig.content.copyrightText }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import footerConfig from '~/content/components/footer.json'

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

const currentYear = new Date().getFullYear()

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
  const s3BaseUrl = footerConfig.imageConfig?.s3BaseUrl || 'https://client-assets.s3.amazonaws.com'
  return `${s3BaseUrl}/${imagePath.replace(/^\//, '')}`
}

// Merge custom config with default config
const mergedConfig = computed(() => {
  return {
    ...footerConfig,
    ...props.customConfig
  }
})
</script>
