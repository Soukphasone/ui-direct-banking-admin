<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { showAlert } from '@/stores/alert'
import { useOpenModalStore } from '@/stores/modal'

const { t } = useI18n()
const isOpen = useOpenModalStore()
const selectedBranch = ref('')
const cif = ref('')
const fullName = ref('')
const email = ref('')
const tel = ref('')
const userName = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref(false)
const checkMail = ref(false)
const checkPassword = ref(false)
const errorMessage = ref('')
const isShowEyePass = ref(false)
const isShowEyeConPass = ref(false)
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
const clearFrom = () => {
  cif.value = ''
  selectedBranch.value = ''
  fullName.value = ''
  email.value = ''
  tel.value = ''
  userName.value = ''
  password.value = ''
  confirmPassword.value = ''
  isOpen.isOpenModalEdit = false
  error.value = false
  errorMessage.value = ''
}
const handleShowEye = (value) => {
  if (value === '1') {
    isShowEyePass.value = !isShowEyePass.value
  } else if (value === '2') {
    isShowEyeConPass.value = !isShowEyeConPass.value
  }
}
const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
  checkMail.value = !emailPattern.test(email.value)
}
const validatePassword = () => {
  const checkPass = password.value === confirmPassword.value
  checkPassword.value = !checkPass
}
const handleRegister = () => {
  if (!cif.value || !selectedBranch.value || !fullName.value || !tel.value || !userName.value) {
    if (!email.value) {
      checkMail.value = true
    }
    if (!password.value) {
      checkPassword.value = true
    }
    if (!confirmPassword.value) {
      checkPassword.value = true
    }
    error.value = true
    errorMessage.value = 'Plase check again'
    return
  } else if (cif.value.length < 9) {
    error.value = true
    errorMessage.value = 'Plaese check CIF'
    return
  } else if (checkMail.value === true) {
    checkMail.value = true
    errorMessage.value = 'Error Mail'
    return
  } else if (tel.value.length < 8) {
    error.value = true
    errorMessage.value = 'Check Number Phone'
    return
  } else if (!password.value || !confirmPassword.value) {
    checkPassword.value = true
    errorMessage.value = 'Plase check again'
    return
  } else if (password.value != confirmPassword.value) {
    checkPassword.value = true
    errorMessage.value = 'Password Not Match'
    return
  }
  // if (checkMail.value === false) {
  //   console.log('errMail')
  //   return
  // }
  clearFrom()
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
      class="px-4 py-2 bg-red-500 text-white rounded-lg transition focus:outline-none hover:bg-red-600"
      :class="{ hidden: isOpen.isOpenModalEdit, block: !isOpen.isOpenModalEdit }"
      @click="isOpen.isOpenModalEdit = true"
    >
      <span class="flex gap-2">
        <svg
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M19 8v6"></path>
          <path d="M16 11h6"></path>
        </svg>
        {{ t('register_here') }}
      </span>
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
              class="text-center text-whiter text-2xl font-bold font-lao bg-red-400 w-10 h-10 py-1 px-2 rounded-max hover:bg-red-500"
            >
              x
            </button>
          </div>

          <h2 class="flex justify-center text-xl text-gray-800 mb-4">
            {{ t('customer_information') }}
          </h2>
          <div class="space-y-2">
            <div class="flex gap-3 items-center">
              <label
                class="block mb-1 font-medium text-gray-900 w-[300px]"
                :class="{
                  'text-red-500': error && !selectedBranch,
                  'text-green-600 font-medium': selectedBranch != null && selectedBranch !== ''
                }"
              >
                {{ t('branch_register') }}
              </label>

              <select
                v-model="selectedBranch"
                class="bg-gray-50 border border-gray-300 text-gray-500 rounded-lg block py-1 px-3 w-full outline-none"
                :class="{
                  'text-red-500 border border-red-500 ':
                    (selectedBranch == null || selectedBranch === '') && error,
                  'text-gray-900 text-sm border border-green-500 ':
                    selectedBranch != null && selectedBranch !== ''
                }"
              >
                <option class="font-medium" value="">{{ t('select_branch') }}</option>
                <option
                  class="text-sm"
                  v-for="branch in branches"
                  :key="branch.id"
                  :value="branch.branch_id"
                >
                  {{ branch.name }}
                </option>
              </select>
            </div>
            <div class="flex gap-3 items-center">
              <label
                class="block mb-1 text-gray-900 w-[300px]"
                :class="{
                  'text-red-500': error && cif.length != 9,
                  'text-green-600 font-medium': cif != null && cif !== '' && cif.length === 9
                }"
              >
                {{ t('account_number_cif') }}
              </label>
              <input
                type="text"
                v-model="cif"
                :placeholder="t('enter_cif')"
                class="bg-gray-50 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg block py-1 px-3 w-full outline-none"
                :class="{
                  'placeholder-red-500 border border-red-500 text-red-500':
                    error && cif.length != 9,
                  'border border-green-500': cif != null && cif !== '' && cif.length === 9
                }"
              />
            </div>
            <div class="flex gap-3 items-center">
              <label
                class="block mb-1 text-gray-900 w-[300px]"
                :class="{
                  'text-red-500': error && !fullName,
                  'text-green-600 font-medium': fullName != null && fullName !== ''
                }"
              >
                {{ t('full_name') }}
              </label>
              <input
                type="text"
                v-model="fullName"
                :placeholder="$t('enter_full_name')"
                class="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg block py-1 px-3 w-full outline-none"
                :class="{
                  'placeholder-red-500 border border-red-500': error && !fullName,
                  'border border-green-500': fullName != null && fullName !== ''
                }"
              />
            </div>
            <div class="flex gap-3 text-gray-900 items-center">
              <label
                class="block mb-1 w-[300px]"
                :class="{
                  'text-red-500': checkMail,
                  'text-green-600 font-medium': !checkMail && email != null && email !== ''
                }"
              >
                {{ t('email') }}
              </label>
              <input
                type="email"
                v-model="email"
                @input="validateEmail"
                :placeholder="$t('enter_email')"
                class="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg block py-1 px-3 w-full outline-none"
                :class="{
                  'placeholder-red-500 border border-red-500': checkMail,
                  'border border-green-500': email !== '' && !checkMail
                }"
              />
            </div>
            <div class="flex gap-3 items-center">
              <label
                class="block mb-1 text-gray-900 w-[300px]"
                :class="{
                  'text-red-500': error && tel.length < 8,
                  'text-green-600 font-medium': tel != null && tel !== '' && tel.length >= 8
                }"
              >
                {{ t('tel') }}
              </label>
              <input
                type="text"
                v-model="tel"
                :placeholder="t('enter_tel')"
                class="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg block py-1 px-3 w-full outline-none"
                :class="{
                  'placeholder-red-500 border border-red-500 text-red-500': error && tel.length < 8,
                  'border border-green-500': cif != null && tel !== '' && tel.length >= 8
                }"
              />
            </div>
            <div class="flex justify-center items-center text-primary text-center">
              <span class="text-lg mt-2 mb-2">
                {{ t('login_information') }}
              </span>
            </div>
            <div class="flex gap-3 items-center">
              <label
                class="block mb-1 text-gray-900 w-[300px]"
                :class="{
                  'text-red-500': error && !userName,
                  'text-green-600 font-medium': userName != null && userName !== ''
                }"
              >
                {{ t('user_name') }}
              </label>
              <input
                type="text"
                v-model="userName"
                :placeholder="t('enter_name')"
                class="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg block py-1 px-3 w-full outline-none"
                :class="{
                  'placeholder-red-500 border border-red-500': error && !userName,
                  'border border-green-500': userName != null && userName !== ''
                }"
              />
            </div>
            <div class="flex gap-3 items-center">
              <label
                class="block text-gray-900 w-[300px]"
                :class="{
                  'text-red-500': checkPassword,
                  'text-green-600 font-medium':
                    password != null && password !== '' && !checkPassword
                }"
              >
                {{ t('password') }}
              </label>
              <div
                class="relative bg-gray-50 border border-gray-300 rounded-lg block py-1 px-3 w-full outline-none"
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
                  class="bg-gray-50 text-gray-900 placeholder-gray-500 outline-none w-full"
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
            <div class="flex gap-3 items-center">
              <label
                class="block text-gray-900 w-[300px]"
                :class="{
                  'text-red-500': checkPassword,
                  'text-green-600 font-medium':
                    confirmPassword != null && confirmPassword !== '' && !checkPassword
                }"
              >
                {{ t('confirm_password') }}
              </label>
              <div
                class="relative bg-gray-50 border border-gray-300 rounded-lg block py-1 px-3 w-full outline-none"
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
          <div class="flex mt-10 gap-x-4 justify-end">
            <button
              @click="handleRegister"
              class="w-[20%] flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700"
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
