<script setup>
import TableCusomerList from '../Tables/TableCusomerList.vue'
import TableAuthorizeList from '../Tables/TableAuthorizeList.vue'
import Register from '@/components/Customer/Register.vue'
import { ref, watch } from 'vue'

const tabs = ['Unauthorization List', 'Customer List', 'Register', 'Reset Password']

// Get the stored tab or default to 'Unauthorization List'
const activeTab = ref(localStorage.getItem('ActiveTab') || 'Unauthorization List')
watch(activeTab, (newTab) => {
  localStorage.setItem('ActiveTab', newTab)
})
const activeTabs = (tab) => {
  activeTab.value = tab
}
</script>
<template>
  <div class="w-full mx-auto">
    <!-- Tab Buttons -->
    <div
      class="sticky top-15 flex items-center justify-center w-full p-6 nav-header rounded-xl z-999"
      style="margin-top: -20px"
    >
      <div class="flex w-[60%] rounded-lg">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTabs(tab)"
          class="flex-1 text-center font-medium transition-all duration-300 rounded-lg py-2 px-2"
          :class="[
            activeTab === tab
              ? 'border border-white text-whiter rounded-lg p-0.5'
              : 'text-whiter hover:text-whiter hover:border border-gray-100'
          ]"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="bg-gray-100 rounded-lg mt-4">
      <p v-if="activeTab === 'Unauthorization List'">
        <TableAuthorizeList />
      </p>
      <p v-else-if="activeTab === 'Customer List'">
        <TableCusomerList />
      </p>
      <p v-else-if="activeTab === 'Register'">
        <Register />
      </p>
      <p v-else-if="activeTab === 'Reset Password'">Reset Password</p>
    </div>
  </div>
</template>
