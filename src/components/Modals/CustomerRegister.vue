<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { showAlert } from '@/stores/alert'
import { defineProps } from 'vue'
import { useOpenModalStore } from '@/stores/modal'

const { t } = useI18n()
const isOpen = useOpenModalStore()
const selectedBranch = ref('')
// const customerFind = ref([])
// const error = ref('')
// const cif = computed(() => props.data.CIF || '')
// const fullName = computed(() => props.data.FULLNAME || '')
// const email = computed(() => props.data.EMAIL || '')
// const tel = computed(() => props.data.TEL || '')
// const createdDate = computed(() => props.data.CREATE_DATE || '')
const branches = ref([
  { id: 1, branch_id: '010', name: 'LAO - VIET BANK, HEAD OFFICE' },
  { id: 2, branch_id: '011', name: 'SALAKHAM BANKING UNIT' },
  { id: 3, branch_id: '012', name: 'MORNING MARKET UNIT' },
  { id: 4, branch_id: '013', name: 'SYKHAY SERVICES UNIT' },
  { id: 5, branch_id: '014', name: 'DONGDOK SERVICES UNIT' },
  { id: 6, branch_id: '015', name: 'LAO VIET BANK, DONNOUN SERVICE UNIT' },
  { id: 7, branch_id: '016', name: 'LAO VIET BANK, ITECC Service Unit' },
  { id: 8, branch_id: '017', name: 'LAOVIET BANK, WATTAY UNIT' },
  { id: 9, branch_id: '018', name: 'Lao Viet Joint Venture Bank - Naxay' },
  { id: 10, branch_id: '030', name: 'LAO - VIET BANK CHAMPASAK BRANCH' },
  { id: 11, branch_id: '031	', name: 'LAO VIET BANK, TRANSACTION DEPT KM8' },
  { id: 12, branch_id: '032', name: 'LAOVIETBANK DUANGDY TRN UNIT' },
  { id: 13, branch_id: '050', name: 'LAO - VIET BANK SAVANAKHET BRANCH' },
  { id: 14, branch_id: '051', name: 'LAOVIETBANK SENO Service Unit' },
  { id: 15, branch_id: '052', name: 'LAOVIET BANK DENSAVANH TRN UNIT' },
  { id: 16, branch_id: '053', name: 'LAOVIET BANK KAYSONE TRN UNIT' },
  { id: 17, branch_id: '060', name: 'LAO - VIET BANK ATTAPEU BRANCH' },
  { id: 18, branch_id: '070', name: 'LAO-VIET BANK XIENGKHOANG BRANCH' },
  { id: 19, branch_id: '071', name: 'LAOVIET BANK PHONSAVANH UNIT' },
  { id: 20, branch_id: '080', name: 'LAO-VIET BANK LUANGPRABANG BRANCH' },
  { id: 21, branch_id: '081', name: 'LAO-VIET BANK LUANGPRABANG BRANCH' },
  { id: 22, branch_id: '090', name: 'LAO-VIET BANK KHAMMOUAN BRANCH' },
  { id: 23, branch_id: '091', name: 'LAOVIETBANK NO.3 MARKET ZONE TRAN' },
  { id: 24, branch_id: '100', name: 'UODOMXAY BANKING UNIT' },
  { id: 25, branch_id: '110', name: 'LAO VIETBANK BOLIKHAMXAY UNIT' }
])
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
    <button
      type="button"
      class="px-4 py-2 bg-red-500 text-whiter rounded-lg transition focus:outline-none hover:bg-red-600"
      @click="isOpen.isOpenModalEdit = true"
    >
      {{ t('register_here') }}
    </button>
    <transition name="fade-scale">
      <div
        v-if="isOpen.isOpenModalEdit"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-9999"
        @click.prevent="closeOnEscape"
      >
        <!-- Modal Content -->
        <div class="bg-white p-6 rounded-2xl shadow-lg w-[600px]">
          <div class="flex justify-end w-full">
            <button
              @click="isOpen.isOpenModalEdit = false"
              class="text-center text-whiter text-2xl font-bold bg-red-400 w-10 h-10 py-1 px-2 rounded-max hover:bg-red-500"
            >
              x
            </button>
          </div>

          <h2 class="flex justify-center text-xl text-gray-800 mb-4">
            {{ t('customer_information') }}
          </h2>
          <div class="space-y-2">
            <div class="flex gap-3 items-center">
              <label class="block mb-1 font-medium text-gray-900 w-[300px]">
                {{ t('branch_register') }}
              </label>
              <select
                v-model="selectedBranch"
                class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-black block py-1 px-3 w-full"
                :class="{
                  'text-gray-500': selectedBranch === '',
                  'text-gray-900 text-sm': selectedBranch != ''
                }"
              >
                <option class="text-gray-500" value="">{{ t('select_branch') }}</option>
                <option
                  class="text-sm"
                  v-for="branch in branches"
                  :key="branch.id"
                  :value="branch.id"
                >
                  {{ branch.name }}
                </option>
              </select>
            </div>
            <div class="flex gap-3 items-center">
              <label class="block mb-1 font-medium text-gray-900 w-[300px]">
                {{ t('account_number_cif') }}
              </label>
              <input
                type="text"
                :placeholder="t('enter_cif')"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block py-1 px-3 placeholder-gray-500 w-full"
              />
            </div>
            <div class="flex gap-3 items-center">
              <label class="block mb-1 font-medium text-gray-900 w-[300px]">
                {{ t('full_name') }}
              </label>
              <input
                type="text"
                :placeholder="$t('enter_full_name')"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block py-1 px-3 placeholder-gray-500 w-full"
              />
            </div>
            <div class="flex gap-3 items-center">
              <label class="block mb-1 font-medium text-gray-900 w-[300px]">
                {{ t('email') }}
              </label>
              <input
                type="email"
                :placeholder="t('enter_email')"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block py-1 px-3 placeholder-gray-500 w-full"
              />
            </div>
            <div class="flex gap-3 items-center">
              <label class="block mb-1 font-medium text-gray-900 w-[300px]">
                {{ t('tel') }}
              </label>
              <input
                type="text"
                :placeholder="t('enter_tel')"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block py-1 px-3 placeholder-gray-500 w-full"
              />
            </div>
            <div class="flex justif-start text-red-500">
              <p class="bg-gray-100 py-1 px-2 rounded-lg mb-2 mt-2">{{ t('login_information') }}</p>
            </div>
            <div class="flex gap-3 items-center">
              <label class="block mb-1 font-medium text-gray-900 w-[300px]">
                {{ t('user_name') }}
              </label>
              <input
                type="text"
                :placeholder="t('enter_name')"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block py-1 px-3 placeholder-gray-500 w-full"
              />
            </div>
            <div class="flex gap-3 items-center">
              <label class="block font-medium text-gray-900 w-[300px]">
                {{ t('password') }}
              </label>
              <input
                type="password"
                :placeholder="t('enter_password')"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block py-1 px-3 placeholder-gray-500 w-full"
              />
            </div>
            <div class="flex gap-3 items-center">
              <label class="block font-medium text-gray-900 w-[300px]">
                {{ t('confirm_password') }}
              </label>
              <input
                type="password"
                :placeholder="t('enter_confirm_password')"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block py-1 px-3 placeholder-gray-500 w-full"
              />
            </div>
          </div>
          <div class="flex mt-10 gap-x-4 justify-end">
            <button
              @click.prevent="handleUpdate"
              class="w-[20%] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ t('register') }}
            </button>
            <!-- <button
              @click.prevent="isOpen.isOpenModalEdit = false"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {{ t('cancel') }}
            </button> -->
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
