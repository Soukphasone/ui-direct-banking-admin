<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { showAlert } from '@/stores/alert'
const { t } = useI18n()
const cif = ref('')
const customerFind = ref([])
const error = ref('')
const isOpen = ref(false)
const customerData = ref([
  {
    branch: 'New York',
    cif: 'CIF001',
    fullname: 'John Doe',
    create_date: '2024-02-21',
    email: 'johndoe@example.com',
    tel: '+1-555-1234',
    customer_type: 'Individual',
    unique_id: 'UID-0001'
  },
  {
    branch: 'Los Angeles',
    cif: 'CIF002',
    fullname: 'Jane Smith',
    create_date: '2023-12-15',
    email: 'janesmith@example.com',
    tel: '+1-555-5678',
    customer_type: 'Business',
    unique_id: 'UID-0002'
  },
  {
    branch: 'Chicago',
    cif: 'CIF003',
    fullname: 'Michael Johnson',
    create_date: '2024-01-10',
    email: 'michaelj@example.com',
    tel: '+1-555-8765',
    customer_type: 'Individual',
    unique_id: 'UID-0003'
  },
  {
    branch: 'Houston',
    cif: 'CIF004',
    fullname: 'Emily Davis',
    create_date: '2024-02-01',
    email: 'emilyd@example.com',
    tel: '+1-555-4321',
    customer_type: 'Business',
    unique_id: 'UID-0004'
  },
  {
    branch: 'San Francisco',
    cif: 'CIF005',
    fullname: 'William Brown',
    create_date: '2023-11-20',
    email: 'willb@example.com',
    tel: '+1-555-6789',
    customer_type: 'Individual',
    unique_id: 'UID-0005'
  },
  {
    branch: 'Boston',
    cif: 'CIF006',
    fullname: 'Sophia Martinez',
    create_date: '2024-02-05',
    email: 'sophiam@example.com',
    tel: '+1-555-2468',
    customer_type: 'Business',
    unique_id: 'UID-0006'
  },
  {
    branch: 'Seattle',
    cif: 'CIF007',
    fullname: 'David Wilson',
    create_date: '2023-12-30',
    email: 'davidw@example.com',
    tel: '+1-555-1357',
    customer_type: 'Individual',
    unique_id: 'UID-0007'
  },
  {
    branch: 'Miami',
    cif: 'CIF008',
    fullname: 'Olivia Taylor',
    create_date: '2024-01-15',
    email: 'oliviat@example.com',
    tel: '+1-555-9876',
    customer_type: 'Business',
    unique_id: 'UID-0008'
  },
  {
    branch: 'Dallas',
    cif: 'CIF009',
    fullname: 'James Anderson',
    create_date: '2023-10-10',
    email: 'jamesa@example.com',
    tel: '+1-555-3698',
    customer_type: 'Individual',
    unique_id: 'UID-0009'
  },
  {
    branch: 'Denver',
    cif: 'CIF010',
    fullname: 'Emma Harris',
    create_date: '2024-01-25',
    email: 'emma.h@example.com',
    tel: '+1-555-7412',
    customer_type: 'Business',
    unique_id: 'UID-0010'
  }
])
const checkCustomer = () => {
  if (!cif.value) {
    return
  }
  error.value = 'CIF Not Match'
  const foundCustomer = customerData.value.find((customer) => customer.cif === cif.value)
  if (foundCustomer) {
    customerFind.value = foundCustomer
    isOpen.value = true
  } else {
    showAlert(
      t('cif_wrong'),
      t('try_again'),
      'error',
      'Yes',
      'Cancel',
      '#f86060',
      '#28a745',
      '#dc3545',
      false,
      false,
      2000
    )
  }
}
const closeOnEscape = (event) => {
  if (event.key === 'Escape') {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', closeOnEscape)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', closeOnEscape)
})
</script>
<template>
  <div class="flex items-center justify-center">
    <!-- Trigger Button -->
    <form @submit.prevent="checkCustomer">
      <div class="flex gap-2">
        <input
          type="text"
          v-model="cif"
          class="border border-gray-300 rounded-lg px-2 focus:outline-none"
        />
        <button
          type="submit"
          class="px-4 py-2 border border-gray-300 rounded-lg transition focus:outline-none"
          :class="{
            'bg-primary text-white rounded-md hover:bg-blue-700 transition focus:outline-none':
              cif.length > 0
          }"
        >
          Check
        </button>
      </div>
    </form>

    <!-- Modal Overlay -->
    <transition name="fade-scale">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-9999"
        @click.self="isOpen = false"
        @click.prevent="closeOnEscape"
      >
        <!-- Modal Content -->
        <div class="bg-white p-6 rounded-2xl shadow-lg w-100">
          <h2 class="flex justify-center text-xl text-gray-800">{{ t('customer_information') }}</h2>
          <p class="text-gray-700 mt-2">Branch register: {{ customerFind.branch }}</p>
          <p class="text-gray-700 mt-2">CIF: {{ customerFind.cif }}</p>
          <p class="text-gray-700 mt-2">Branch in FCC: {{ customerFind.branch }}</p>
          <p class="text-gray-700 mt-2">Full name: {{ customerFind.fullname }}</p>
          <p class="text-gray-700 mt-2">Create Date: {{ customerFind.create_date }}</p>
          <p class="text-gray-700 mt-2">Email: {{ customerFind.email }}</p>
          <p class="text-gray-700 mt-2">Tel: {{ customerFind.tel }}</p>
          <p class="text-gray-700 mt-2">Customer Type: {{ customerFind.customer_type }}</p>
          <p class="text-gray-700 mt-2">Unique ID: {{ customerFind.unique_id }}</p>
          <form>
            <div class="space-y-2">
              <div class="text-xl text-center text-black mt-4">
                {{ t('new_password') }}
              </div>
              <div>
                <label for="password" class="block mb-2 font-medium text-gray-900">{{
                  t('password')
                }}</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-1.5 px-3"
                  required
                />
              </div>
              <div>
                <label for="confirm_password" class="block mb-2 font-medium text-gray-900">{{
                  t('confirm_password')
                }}</label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-1.5 px-3"
                  required
                />
              </div>
            </div>
            <div class="flex mt-6 gap-x-4">
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {{ t('confirm') }}
              </button>
              <button
                @click.prevent="isOpen = false"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {{ t('cancel') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>
