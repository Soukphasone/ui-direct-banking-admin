<script setup>
import { PATH } from '@/router/pathName'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showAlert } from '@/stores/alert'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const userData = JSON.parse(localStorage.getItem('userData'))
const fullName = userData?.FULLNAME
const target = ref(null)
const dropdownOpen = ref(false)

const logOut = () => {
  showAlert(
    t('do_you_want_to_log_out'),
    t('confirm')+'!',
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
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('dataReport');
      localStorage.removeItem('dateRange');
      localStorage.removeItem('ActiveTab');
      router.push(PATH.LOGIN);
    }
  });
};

onClickOutside(target, () => {
  dropdownOpen.value = false
})
</script>


<template>
  <div class="hidden sm:block relative" ref="target">
    <div class="flex items-center focus:outline-none" @click="logOut">
      <div v-if="userData" class="block text-black text-left text-user">
        <p>{{ fullName }}</P>
        <p>Admin</p>
      </div>
      <div v-else class="block text-lg text-black text-left">
        <p>{{ $t('hello') }}</p>
        <p>Admin</p>
      </div>
      <div v-if="userData" class="hidden sm:block absolute right-0 h-9 w-9 mb-2">
        <img src="@/assets/images/icon/icon-exit.png" alt="exit" class="rounded-max bg-white" />
      </div>
    </div>
  </div>
</template>
<style>
.text-user {
  font-size: 12px;
}
</style>
