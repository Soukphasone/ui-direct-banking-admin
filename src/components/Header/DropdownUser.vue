<script setup>
import { PATH } from '@/router/pathName'
import { showAlert } from '@/stores/alert'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const userData = JSON.parse(localStorage.getItem('userData'))
console.log("User", userData);
const fullName = userData?.EMPNAME
const router = useRouter()

const logOut = () => {
  showAlert(
    t('do_you_want_to_log_out'),
    t('confirm') + '!',
    'warning',
    t('Yes'),
    t('cancel'),
    '#86e54c',
    '#28a745',
    '#dc3545',
    true,
    true
  ).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      localStorage.removeItem('dataReport')
      localStorage.removeItem('dateRange')
      localStorage.removeItem('page')
      localStorage.removeItem('ActiveTab')
      router.push(PATH.LOGIN)
    }
  })
}
</script>
<template>
  <div class="hidden sm:block relative">
    <div class="flex items-center">
      <div v-if="userData" class="block text-black text-left text-user">
        <p>{{ fullName }}</p>
        <p class="text-lg">{{ $t('admin') }}</p>
      </div>
      <div v-else class="block text-lg text-black text-left">
        <p>{{ $t('hello') }}</p>
        <p class="text-lg">{{ $t('admin') }}</p>
      </div>
      <button
        v-if="userData"
        class="hidden sm:block absolute right-0 h-9 w-9 mb-2 focus:outline-none"
        @click="logOut"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          class="fill-red-500 hover:fill-red-600"
        >
          <path
            d="M10 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H10V19H5V5H10V3ZM21 12L16 7V10H9V14H16V17L21 12Z"
          />
        </svg>
        <p class="text-user text-red-500">{{ $t('exit') }}</p>
      </button>
    </div>
  </div>
</template>
<style>
.text-user {
  font-size: 12px;
}
</style>
