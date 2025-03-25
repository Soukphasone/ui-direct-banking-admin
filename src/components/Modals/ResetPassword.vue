<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { showAlert } from '@/stores/alert'
const { t } = useI18n()
const cif = ref('')
const customerFind = ref([])
const errorMessage = ref('')
const isOpen = ref(false)
const password = ref('')
const confirmPassword = ref('')
const isShowEyePass = ref(false)
const isShowEyeConPass = ref(false)
const checkPassword = ref(false)
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
const clearFrom = () => {
  password.value = ''
  confirmPassword.value = ''
  isOpen.value = false
  errorMessage.value = ''
}
const checkCustomer = () => {
  if (!cif.value) {
    return
  }
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
      3000
    )
  }
}
const handleShowEye = (value) => {
  if (value === '1') {
    isShowEyePass.value = !isShowEyePass.value
  } else if (value === '2') {
    isShowEyeConPass.value = !isShowEyeConPass.value
  }
}
const validatePassword = () => {
  const _check1 = password.value === confirmPassword.value
  const _check2 = password.value.length >= 6 || confirmPassword.value.length >= 6
  checkPassword.value = !(_check1 && _check2)
}
const handleUpdatePassword = () => {
  if (!password.value || !confirmPassword.value) {
    checkPassword.value = true
    return
  } else if (password.value.length < 6 || confirmPassword.value.length < 6) {
    errorMessage.value = t('password_more_6')
    return
  } else if (password.value !== confirmPassword.value) {
    errorMessage.value = t('passwords_do_not_match')
    return
  }
  clearFrom()
  showAlert(
      t('change_password'),
      t('success'),
      'success',
      'Yes',
      'Cancel',
      '#86e54c',
      '#28a745', // Confirm button color (green)
      '#dc3545',
      false,
      false,
      2000
    )
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
          :placeholder="t('enter_cif')"
          class="border border-gray-300 rounded-lg px-2 focus:outline-none"
        />
        <button
          type="submit"
          class="px-2 py-1 border border-gray-300 rounded-lg transition focus:outline-none"
          :class="{
            'bg-primary text-white rounded-md hover:bg-blue-700 transition focus:outline-none':
              cif.length > 0
          }"
        >
          <span class="flex items-center gap-1">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="16" y1="16" x2="22" y2="22" />
            </svg>
            {{ t('check') }}
          </span>
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
          <h2 class="flex justify-center text-lg text-gray-900 mb-4">
            {{ t('customer_information') }}
          </h2>
          <div class="flex gap-2 w-full">
            <p class="text-gray-900 text-sm w-[50%]">{{ t('branch_register') }}:</p>
            <p class="text-red-500 text-left text-sm w-[50%]">{{ customerFind.branch }}</p>
          </div>
          <div class="flex gap-2">
            <p class="text-gray-900 text-sm w-[50%]">{{ t('account_number_cif') }}:</p>
            <p class="text-red-500 text-left text-sm w-[50%]">{{ customerFind.cif }}</p>
          </div>
          <div class="flex gap-2">
            <p class="text-gray-900 text-sm w-[50%]">{{ t('branch_in') }} FCC:</p>
            <p class="text-red-500 text-left text-sm w-[50%]">{{ customerFind.cif }}</p>
          </div>
          <div class="flex gap-2">
            <p class="text-gray-900 text-sm w-[50%]">{{ t('full_name') }}:</p>
            <p class="text-red-500 text-left text-sm w-[50%]">{{ customerFind.fullname }}</p>
          </div>
          <div class="flex gap-2">
            <p class="text-gray-900 text-sm w-[50%]">{{ t('created_at') }}:</p>
            <p class="text-red-500 text-left text-sm w-[50%]">{{ customerFind.create_date }}</p>
          </div>
          <div class="flex gap-2">
            <p class="text-gray-900 text-sm w-[50%]">{{ t('email') }}:</p>
            <p class="text-red-500 text-left text-sm w-[50%]">{{ customerFind.email }}</p>
          </div>
          <div class="flex gap-2">
            <p class="text-gray-900 text-sm w-[50%]">{{ t('tel') }}:</p>
            <p class="text-red-500 text-left text-sm w-[50%]">{{ customerFind.tel }}</p>
          </div>
          <div class="flex gap-2">
            <p class="text-gray-900 text-sm w-[50%]">{{ t('customer_type') }}:</p>
            <p class="text-red-500 text-left text-sm w-[50%]">{{ customerFind.customer_type }}</p>
          </div>
          <div class="flex gap-2">
            <p class="text-gray-900 text-sm w-[50%]">Unique ID:</p>
            <p class="text-red-500 text-left text-sm w-[50%]">{{ customerFind.unique_id }}</p>
          </div>
          <div class="space-y-3">
            <div class="text-lg text-center text-black mt-4">
              {{ t('new_password') }}
            </div>
            <div class="">
              <label
                class="block text-gray-900 text-sm w-[300px]"
                :class="{
                  'text-red-500': checkPassword,
                  'text-green-600 font-medium':
                    password != null && password !== '' && !checkPassword
                }"
              >
                {{ t('password') }}
              </label>
              <div
                class="relative bg-gray-50 border border-gray-300 rounded-lg block py-1 px-3 w-full outline-none mt-2"
                :class="{
                  'placeholder-red-500 border border-red-500': checkPassword,
                  'border border-green-500': password != null && password !== '' && !checkPassword
                }"
              >
                <input
                  v-model="password"
                  :type="isShowEyePass ? 'text' : 'password'"
                  @input="validatePassword"
                  :placeholder="t('enter_password')"
                  class="bg-gray-50 text-gray-900 text-sm placeholder-gray-500 outline-none w-full"
                  :class="{
                    'placeholder-red-500': checkPassword
                  }"
                />
                <button
                  v-if="password"
                  type="button"
                  @click="handleShowEye('1')"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 focus:outline-none"
                >
                  <span v-if="isShowEyePass">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6 text-gray-700"
                    >
                      <path
                        d="M12 4.5c-5 0-9.27 3.11-11 7.5 1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Zm0 12a4.5 4.5 0 1 1 4.5-4.5 4.5 4.5 0 0 1-4.5 4.5Z"
                      />
                      <path
                        d="M3 3l18 18M12 12"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span v-else>
                    <svg
                      viewBox="'0 0 24 24'"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 text-gray-700"
                    >
                      <path
                        d="M12 4C7 4 2.73 7.11 1 12c1.73 4.89 6 8 11 8s9.27-3.11 11-8c-1.73-4.89-6-8-11-8Zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6Zm0-10a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div class="">
              <label
                class="block text-gray-900 text-sm w-[300px]"
                :class="{
                  'text-red-500': checkPassword,
                  'text-green-600 font-medium':
                    confirmPassword != null && confirmPassword !== '' && !checkPassword
                }"
              >
                {{ t('confirm_password') }}
              </label>
              <div
                class="relative bg-gray-50 border border-gray-300 rounded-lg block py-1 px-3 w-full outline-none mt-2"
                :class="{
                  'placeholder-red-500 border border-red-500': checkPassword,
                  'border border-green-500':
                    confirmPassword != null && confirmPassword !== '' && !checkPassword
                }"
              >
                <input
                  v-model="confirmPassword"
                  :type="isShowEyeConPass ? 'text' : 'password'"
                  @input="validatePassword"
                  :placeholder="t('enter_confirm_password')"
                  text-sm
                  class="bg-gray-50 text-gray-900 placeholder-gray-500 outline-none w-full"
                  :class="{
                    'placeholder-red-500': checkPassword
                  }"
                />
                <button
                  v-if="confirmPassword"
                  type="button"
                  @click="handleShowEye('2')"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 focus:outline-none"
                >
                  <span v-if="isShowEyeConPass">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6 text-gray-700"
                    >
                      <path
                        d="M12 4.5c-5 0-9.27 3.11-11 7.5 1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Zm0 12a4.5 4.5 0 1 1 4.5-4.5 4.5 4.5 0 0 1-4.5 4.5Z"
                      />
                      <path
                        d="M3 3l18 18M12 12"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span v-else>
                    <svg
                      viewBox="'0 0 24 24'"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 text-gray-700"
                    >
                      <path
                        d="M12 4C7 4 2.73 7.11 1 12c1.73 4.89 6 8 11 8s9.27-3.11 11-8c-1.73-4.89-6-8-11-8Zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6Zm0-10a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div
            v-if="errorMessage"
            class="flex justify-center items-center gap-2 font-medium mt-4 text-red-500 animate-pulse"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 text-red-500"
            >
              <path
                fill-rule="evenodd"
                d="M12 2a1 1 0 0 1 .894.553l9 18A1 1 0 0 1 21 22H3a1 1 0 0 1-.894-1.447l9-18A1 1 0 0 1 12 2ZM11 8a1 1 0 0 1 2 0v5a1 1 0 0 1-2 0V8Zm1 9a1.25 1.25 0 1 1 0 2.5A1.25 1.25 0 0 1 12 17Z"
                clip-rule="evenodd"
              />
            </svg>
            {{ errorMessage }}
          </div>
          <div class="flex mt-6 gap-x-4">
            <button
              @click="handleUpdatePassword"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none"
            >
              {{ t('confirm') }}
            </button>
            <button
              @click.prevent="isOpen = false"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-400 hover:bg-red-500 focus:outline-none"
            >
              {{ t('cancel') }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
