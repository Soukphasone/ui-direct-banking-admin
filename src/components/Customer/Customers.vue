<script setup>
import TableCusomerList from '../Tables/TableCusomerList.vue'
import TableAuthorizeList from '../Tables/TableAuthorizeList.vue'
import CustomerRegister from '../Modals/CustomerRegister.vue'
import ResetPassword from '../Modals/ResetPassword.vue'
import { useOpenModalStore } from '@/stores/modal'
import { ref, watch } from 'vue'

const isOpenModalRegister = useOpenModalStore()
const tabs = ['Unauthorization List', 'Customer List', 'Register', 'Reset Password']
const activeTab = ref(localStorage.getItem('ActiveTab') || 'Unauthorization List')
watch(activeTab, (newTab) => {
  localStorage.setItem('ActiveTab', newTab)
  if (newTab === 'Register') {
    isOpenModalRegister.isOpenModalEdit = true
  }
})
const activeTabs = (tab) => {
  activeTab.value = tab
}
</script>
<template>
  <div class="w-full mx-auto">
    <!-- Tab Buttons -->
    <div
      class="sticky top-15 flex items-center justify-center w-full bg-gray-100 p-6 z-99"
      style="margin-top: -20px"
    >
      <div class="flex border border-gray-300 rounded-lg w-full xl:w-[60%] 2xl:w-[60%]">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click.prevent="activeTabs(tab)"
          class="flex-1 text-center font-medium transition-all duration-300 rounded-lg py-2 px-2 focus:outline-none"
          :class="[
            activeTab === tab
              ? 'border border-gray text-whiter bg-primary rounded-lg p-0.5'
              : 'text-gray-500 hover:text-black hover:border border-gray-500'
          ]"
        >
          <p v-if="tab === 'Unauthorization List'">{{ $t('authorize_customer') }}</p>
          <p v-else-if="tab === 'Customer List'">{{ $t('customer_list') }}</p>
          <p v-else-if="tab === 'Register'">{{ $t('register') }}</p>
          <p v-else-if="tab === 'Reset Password'">{{ $t('reset_pass_customer') }}</p>
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
        <CustomerRegister />
      </p>
      <p v-else-if="activeTab === 'Reset Password'"><ResetPassword /></p>
    </div>
  </div>
</template>
