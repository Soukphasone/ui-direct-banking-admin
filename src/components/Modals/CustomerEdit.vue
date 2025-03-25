<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { showAlert } from '@/stores/alert'
import { defineProps, defineEmits } from 'vue'
import { useOpenModalStore } from '@/stores/modal'
import { formatDate } from '@/service/Format.ts'

const props = defineProps({
  data: Object
})
const emit = defineEmits(['update:data'])
const { t } = useI18n()
const isOpen = useOpenModalStore()
const error = ref('')
const errorCIF = ref(false)

// Reactive properties with watchers
const cif = ref(props.data?.CIF || '')
const fullName = ref(props.data?.FULLNAME || '')
const email = ref(props.data?.EMAIL || '')
const tel = ref(props.data?.TEL || '')
const createdDate = computed(() => props.data?.CREATE_DATE || '')
const checkCIF = ref(false)
const checkFullName = ref(false)
const checkMail = ref(false)
const checkTel = ref(false)
const validateCIF = () => {
  checkCIF.value = !(cif.value.length === 9)
}
const validateFullName = () => {
  checkFullName.value = !fullName.value
}
const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  checkMail.value = !emailPattern.test(email.value)
}
const validateTel = () => {
  checkTel.value = !(tel.value.length >= 8)
}
// Watch for prop changes
watch(
  () => props.data,
  (setUpadate) => {
    if (setUpadate) {
      cif.value = setUpadate.CIF || ''
      fullName.value = setUpadate.FULLNAME || ''
      email.value = setUpadate.EMAIL || ''
      tel.value = setUpadate.TEL || ''
    }
  },
  { deep: true }
)

const handleUpdate = () => {
  // emit('update:data', {
  //   CIF: cif.value,
  //   FULLNAME: fullName.value,
  //   EMAIL: email.value,
  //   TEL: tel.value,
  //   CREATE_DATE: createdDate.value
  // })

  isOpen.isOpenModalEdit = false
  showAlert(
    t('update'),
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
    isOpen.isOpenModalEdit = false
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
    <!-- Modal Overlay -->
    <transition name="fade-scale">
      <div
        v-if="isOpen.isOpenModalEdit"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-9999"
        @click.self="isOpen.isOpenModalEdit = false"
        @click.prevent="closeOnEscape"
      >
        <!-- Modal Content -->
        <div class="bg-white p-6 rounded-2xl shadow-lg w-[600px]">
          <h2 class="flex justify-center text-xl text-gray-800 mb-4">
            {{ t('customer_information') }}
          </h2>
          <div class="space-y-4">
            <div class="flex gap-3 items-center">
              <label
                class="block mb-1 font-medium text-gray-900 w-[400px]"
                :class="{ 'text-red-500': checkCIF }"
              >
                {{ t('account_number_cif') }}
              </label>
              <input
                type="text"
                @input="validateCIF()"
                v-model="cif"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none p-2.5 w-full"
                :class="{
                  'placeholder-red-500 border border-red-500': checkCIF,
                  'border border-green-500': cif !== '' && !checkCIF
                }"
              />
            </div>
            <div class="flex gap-3 items-center">
              <label
                class="block mb-1 font-medium text-gray-900 w-[400px]"
                :class="{ 'text-red-500': checkFullName }"
              >
                {{ t('full_name') }}
              </label>
              <input
                type="text"
                @input="validateFullName"
                v-model="fullName"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none p-2.5 w-full"
                :class="{
                  'placeholder-red-500 border border-red-500': checkFullName,
                  'border border-green-500': fullName !== '' && !checkFullName
                }"
              />
            </div>
            <div class="flex gap-3 items-center">
              <label
                class="block mb-1 font-medium text-gray-900 w-[400px]"
                :class="{ 'text-red-500': checkMail }"
              >
                {{ t('email') }}
              </label>
              <input
                type="email"
                @input="validateEmail"
                v-model="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none p-2.5 w-full"
                :class="{
                  'placeholder-red-500 border border-red-500': checkMail,
                  'border border-green-500': email !== '' && !checkMail
                }"
              />
            </div>
            <div class="flex gap-3 items-center">
              <label
                class="block mb-1 font-medium text-gray-900 w-[400px]"
                :class="{ 'text-red-500': checkTel }"
              >
                {{ t('tel') }}
              </label>
              <input
                type="text"
                @input="validateTel"
                v-model="tel"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none p-2.5 w-full"
                :class="{
                  'placeholder-red-500 border border-red-500': checkTel,
                  'border border-green-500': tel !== '' && !checkTel
                }"
              />
            </div>
            <div class="flex gap-3 items-center">
              <label class="block mb-1 font-medium text-gray-900 w-[400px]">
                {{ t('created_at') }}
              </label>
              <span class="bg-gray-100 text-red-500 rounded-lg p-2.5 w-full">
                {{ formatDate(createdDate) }}
              </span>
            </div>
            <div class="">
              <span class="flex mt-8 gap-x-4">
                <button
                  @click.prevent="handleUpdate"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {{ t('update') }}
                </button>
                <button
                  @click.prevent="isOpen.isOpenModalEdit = false"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {{ t('cancel') }}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
