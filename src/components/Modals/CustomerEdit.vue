<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { showAlert } from '@/stores/alert'
import { defineProps } from 'vue'
import { useOpenModalStore } from '@/stores/modal'

const props = defineProps({
  data: Object // Define the expected type of the prop
})
const { t } = useI18n()
const isOpen = useOpenModalStore()
const customerFind = ref([])
const error = ref('')
const cif = computed(() => props.data.CIF || '')
const fullName = computed(() => props.data.FULLNAME || '')
const email = computed(() => props.data.EMAIL || '')
const tel = computed(() => props.data.TEL || '')
const createdDate = computed(() => props.data.CREATE_DATE || '')

const handleUpdate = () => {
  isOpen.isOpenModalEdit = false
  showAlert(
    t('update'),
    t('success'),
    'success',
    'Yes',
    'Cancel',
    'green',
    '#28a745',
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
          <div class="space-y-4 md:space-y-6">
            <div class="flex gap-3 items-center">
              <label class="block mb-1 font-medium text-gray-900 w-[400px]">
                {{ t('account_number_cif') }}
              </label>
              <input
                type="text"
                name="cif"
                id="cif"
                v-model="cif"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 w-full"
              />
            </div>
            <div class="flex gap-3 items-center">
              <label class="block mb-1 font-medium text-gray-900 w-[400px]">
                {{ t('full_name') }}
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                v-model="fullName"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 w-full"
              />
            </div>
            <div class="flex gap-3 items-center">
              <label class="block mb-1 font-medium text-gray-900 w-[400px]">
                {{ t('email') }}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                v-model="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 w-full"
              />
            </div>
            <div class="flex gap-3 items-center">
              <label class="block mb-1 font-medium text-gray-900 w-[400px]">
                {{ t('tel') }}
              </label>
              <input
                type="text"
                name="tel"
                id="tel"
                v-model="tel"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 w-full"
              />
            </div>
            <div class="flex gap-3 items-center">
              <label class="block mb-1 font-medium text-gray-900 w-[400px]">
                {{ t('created_at') }}
              </label>
              <span class="bg-gray-100 text-red-500 rounded-lg p-2.5 w-full">
                {{ createdDate }}
              </span>
            </div>
            <div class="flex mt-6 gap-x-4">
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
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
@/stores/modal