<template>
  <div>
    <Head>
      <Title>{{ pageData.seoTitle || slug }}</Title>
      <Meta name="description" :content="pageData.seoDescription || 'Dynamic user page'" />
    </Head>
    
    <TemplateRenderer 
      :components="components" 
      :page-data="pageData" 
    />
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug

// Fetch page data from API
const { data: pageResponse } = await $fetch(`/api/pages/${slug}`)

const pageData = pageResponse?.page || {
  seoTitle: `Template 2 - ${slug}`,
  seoDescription: 'User-generated page content',
  templateId: '2'
}

const components = pageResponse?.components || [
  {
    componentId: 'demo-page',
    componentName: 'Demo Page Content',
    code: `<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Demo Page: ${slug}</h2>
    <p class="text-gray-600 mb-4">This is a dynamically generated page using Template 2's header + body layout.</p>
    <div class="bg-blue-100 border-l-4 border-blue-500 p-4">
      <p class="text-blue-700">In production, this content would be loaded from DynamoDB based on user submissions.</p>
    </div>
  </div>
</template>`,
    props: { slug },
    status: 'approved'
  }
]
</script>
