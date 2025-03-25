<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { showAlert } from '@/stores/alert'
import { useOpenModalStore } from '@/stores/modal'
import { customerRegister } from '@/service/GetPostAPI'
import { currentLanguage } from '@/i18n'
import { branches, branchesLao } from '@/stores/branchBankList'
const { t } = useI18n()
const check = ref(currentLanguage.value)
const isOpen = useOpenModalStore()
const branchID = ref('')
const customerType = ref('')
const cif = ref('')
const fullName = ref('')
const email = ref('')
const tel = ref('')
const uniqueID = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref(false)
const checkCIF = ref(false)
const checkMail = ref(false)
const checkPassword = ref(false)
const errorMessage = ref('')
const isShowEyePass = ref(false)
const isShowEyeConPass = ref(false)
const customerTypeList = ref([
  { id: 1, value: 'I', name: 'Individual' },
  { id: 2, value: 'C', name: 'Corporate' },
  { id: 3, value: 'B', name: 'Financial Institute' }
])
watch(currentLanguage, (newLanguage) => {
  check.value = newLanguage
})
const clearFrom = () => {
  cif.value = ''
  branchID.value = ''
  fullName.value = ''
  email.value = ''
  tel.value = ''
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
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  checkMail.value = !emailPattern.test(email.value)
}

const validatePassword = () => {
  const _check1 = password.value === confirmPassword.value
  const _check2 = password.value.length >= 6 || confirmPassword.value.length >= 6
  checkPassword.value = !(_check1 && _check2)
}

const handleRegister = async () => {
  const _customerIformation = {
    Pwd: password.value,
    Email: email.value,
    Cif: cif.value,
    Fullname: fullName.value,
    Branch_id: branchID.value,
    Tel: tel.value,
    User_create: 'User_create',
    Des: 'Add New User',
    Cust_type: customerType.value,
    So_cmt: 'So_cmt'
  }
  if (!cif.value || !branchID.value || !fullName.value || !tel.value || !uniqueID.value) {
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
    errorMessage.value = t('please_check_again')
    return
  } else if (!customerType.value) {
    error.value = true
    errorMessage.value = (t('please_select_ct_type'))
    return
  } else if (!(cif.value.length === 9)) {
    error.value = true
    errorMessage.value = t('wrong_cif')
    return
  } else if (checkMail.value === true) {
    checkMail.value = true
    errorMessage.value = t('wrong_email')
    return
  } else if (tel.value.length < 8) {
    error.value = true
    errorMessage.value = t('wrong_phone_number')
    return
  } else if (!password.value || !confirmPassword.value) {
    checkPassword.value = true
    errorMessage.value = t('please_check_again')
    return
  } else if (password.value.length < 6 || confirmPassword.value.length < 6) {
    checkPassword.value = true
    errorMessage.value = t('password_more_6')
    return
  } else if (password.value != confirmPassword.value) {
    checkPassword.value = true
    errorMessage.value = t('passwords_do_not_match')
    return
  }
  const _dataRegister = await customerRegister(_customerIformation)
  if (_dataRegister.message === 'Add Success') {
    console.log('Hi')
    clearFrom()
    showAlert(
      t('register'),
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
  } else if (_dataRegister.data === 'Duplicate CIF, Customer already exist') {
    checkCIF.value = true
    errorMessage.value = t('duplicate_cif')
    return
  } else {
    errorMessage.value = t('error')
    return
  }
}
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
      >
        <!-- Modal Content -->
        <div class="bg-white p-6 rounded-2xl shadow-lg w-[550px]">
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
          <form @submit.prevent="handleRegister">
            <div class="space-y-2 text-sm">
              <div class="flex gap-3 items-center">
                <label
                  class="block mb-1 text-gray-900 w-[300px]"
                  :class="{
                    'text-red-500': error && !branchID,
                    'text-green-600 font-medium': branchID != null && branchID !== ''
                  }"
                >
                  {{ t('branch_register') }}
                </label>

                <select
                  v-model="branchID"
                  class="bg-gray-50 border border-gray-300 text-gray-500 rounded-lg block py-1 px-3 w-full outline-none"
                  :class="{
                    'text-red-500 border border-red-500 ':
                      (branchID == null || branchID === '') && error,
                    'text-gray-900 text-sm border border-green-500 ':
                      branchID != null && branchID !== ''
                  }"
                >
                  <option class="font-medium" value="">{{ t('select_branch') }}</option>
                  <option
                    class="text-sm"
                    v-for="branch in check === 'la' ? branchesLao : branches"
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
                    'text-red-500': error && !customerType,
                    'text-green-600 font-medium': customerType
                  }"
                >
                  {{ t('customer_type') }}
                </label>

                <div
                  class="w-full space-y-2"
                  :class="{
                    'border border-red-500 rounded-lg py-1 px-3 ': error && !customerType
                  }"
                >
                  <label
                    v-for="customer_type in customerTypeList"
                    :key="customer_type.id"
                    class="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      v-model="customerType"
                      :value="customer_type.value"
                      class="w-6 h-6 border border-red-400"
                    />
                    <span class="text-gray-900" v-if="customer_type.value === 'I'">{{
                      t('individual')
                    }}</span>
                    <span class="text-gray-900" v-else-if="customer_type.value === 'C'">{{
                      t('corporate')
                    }}</span>
                    <span class="text-gray-900" v-else-if="customer_type.value === 'B'">{{
                      t('financial')
                    }}</span>
                  </label>
                </div>
              </div>
              <div class="flex gap-3 items-center">
                <label
                  class="block mb-1 text-gray-900 w-[300px]"
                  :class="{
                    'text-red-500': (error && cif.length != 9) || checkCIF,
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
                      (error && cif.length != 9) || checkCIF,
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
              <div class="flex gap-3 items-center">
                <label
                  class="block mb-1 text-gray-900 w-[300px]"
                  :class="{
                    'text-red-500': error && !uniqueID,
                    'text-green-600 font-medium': uniqueID != null && uniqueID !== ''
                  }"
                >
                  {{ t('unique_id') }}
                </label>
                <input
                  type="text"
                  v-model="uniqueID"
                  :placeholder="$t('enter_unique_id')"
                  class="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg block py-1 px-3 w-full outline-none"
                  :class="{
                    'placeholder-red-500 border border-red-500': error && !uniqueID,
                    'border border-green-500': uniqueID != null && uniqueID !== ''
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
                    'placeholder-red-500 border border-red-500 text-red-500':
                      error && tel.length < 8,
                    'border border-green-500': cif != null && tel !== '' && tel.length >= 8
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
                type="submit"
                class="w-[20%] flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none"
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
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>
