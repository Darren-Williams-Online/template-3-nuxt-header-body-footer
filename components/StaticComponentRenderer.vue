<template>
  <div v-html="renderedCode"></div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  componentData: {
    type: Object,
    required: true
  }
})

// Process the component code and replace template variables with actual values
const renderedCode = computed(() => {
  if (!props.componentData.code) {
    return '<div class="p-4 text-gray-500">No content available</div>'
  }

  let code = props.componentData.code
  
  // Replace template variables like {{ props.title }} with actual values
  if (props.componentData.props) {
    Object.keys(props.componentData.props).forEach(key => {
      const value = props.componentData.props[key]
      const regex = new RegExp(`\\{\\{\\s*props\\.${key}\\s*\\}\\}`, 'g')
      code = code.replace(regex, value)
    })
  }

  return code
})
</script>
