<template>
  <div>
    <div ref="contentToExport">
      <h1>Hello, Vue!</h1>
      <p>This content will be exported to a PDF file.</p>
    </div>
    <button class="mt-3" @click="handleExportToPDF">Export to PDF</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { exportToPDF } from './filePDF'

const contentToExport = ref(null)

const handleExportToPDF = async () => {
  if (contentToExport.value) {
    await exportToPDF(contentToExport.value) // Pass the DOM element
  } else {
    console.error('Content to export is not available.')
  }
}
</script>

<style>
/* Add styles as needed */
</style>
