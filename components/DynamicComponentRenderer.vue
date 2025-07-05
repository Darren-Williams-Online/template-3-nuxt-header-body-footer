<template>
  <div v-if="componentData.code" class="dynamic-component-wrapper">
    <!-- Render user-submitted component dynamically -->
    <!-- Note: In production, this would need proper component compilation -->
    <!-- For now, we'll show a preview of the component -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">{{ componentData.componentName || 'User Component' }}</h3>
          <UBadge :color="getStatusColor(componentData.status)">
            {{ componentData.status }}
          </UBadge>
        </div>
      </template>
      
      <div class="space-y-4">
        <!-- Component Preview/Demo -->
        <div class="p-4 bg-gray-50 rounded-lg">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Component Preview:</h4>
          <div v-html="sanitizedCode" class="component-preview"></div>
        </div>
        
        <!-- Component Props -->
        <div v-if="componentData.props && Object.keys(componentData.props).length">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Props:</h4>
          <pre class="text-xs bg-gray-100 p-2 rounded">{{ JSON.stringify(componentData.props, null, 2) }}</pre>
        </div>
        
        <!-- Component Code (for demo - in production this would be compiled) -->
        <details class="text-sm">
          <summary class="cursor-pointer font-medium text-gray-600">View Source Code</summary>
          <pre class="mt-2 bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">{{ componentData.code }}</pre>
        </details>
      </div>
    </UCard>
  </div>
  
  <div v-else class="dynamic-component-wrapper">
    <UAlert
      icon="i-heroicons-exclamation-triangle"
      color="yellow"
      title="Component Not Found"
      description="This component could not be loaded."
    />
  </div>
</template>

<script setup>
// Props: componentData (object with componentId, componentName, code, props, status)
const props = defineProps({
  componentData: {
    type: Object,
    required: true,
    default: () => ({
      componentId: '',
      componentName: '',
      code: '',
      props: {},
      status: 'pending'
    })
  }
})

// Get status color for badge
const getStatusColor = (status) => {
  switch (status) {
    case 'approved': return 'green'
    case 'pending': return 'yellow'
    case 'rejected': return 'red'
    default: return 'gray'
  }
}

// Basic HTML sanitization (in production, use a proper sanitizer)
const sanitizedCode = computed(() => {
  if (!props.componentData.code) return ''
  
  // Extract template content (very basic - in production use proper Vue compiler)
  const templateMatch = props.componentData.code.match(/<template>(.*?)<\/template>/s)
  if (templateMatch) {
    // Remove Vue directives for basic HTML preview
    return templateMatch[1]
      .replace(/v-\w+="[^"]*"/g, '')
      .replace(/@\w+="[^"]*"/g, '')
      .replace(/:\w+="[^"]*"/g, '')
  }
  
  return 'Component preview not available'
})
</script>

<style scoped>
.component-preview {
  /* Style the preview area */
  border: 1px dashed #e5e7eb;
  min-height: 50px;
}

.component-preview > * {
  /* Reset styles for user content */
  max-width: 100%;
}
</style>
