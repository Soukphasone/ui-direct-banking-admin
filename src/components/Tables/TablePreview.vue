<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { reportFinance } from '@/service/GetPostAPI'
import { encryptData } from '@/stores/encryptDecrypt'
import { formatNumber, formatDate, formatDateShort, formatDateTime } from '@/service/Format.ts'
import Loading from '@/components/Loading/Loading.vue'
const userDataLogin = JSON.parse(localStorage.getItem('userData'))
const { t } = useI18n()
const itemsPerPage = ref(5)
const currentPage = ref(1)
const userData = ref('')
const isLoading = ref(false)
const isLoadingMore = ref(false)
const dataEncrypt = ref('')
const fetchData = async () => {
  dataEncrypt.value = {
    branch_id: userDataLogin?.BRANCH_ID,
    account_no: 'ACTEST101',
    from_date: '14/11/2024',
    to_date: '13/01/2025'
  }
  isLoading.value = true
  try {
    const body = {
      data: encryptData(JSON.stringify(dataEncrypt.value))
    }
    const _report = await reportFinance(body)
    if (_report.data === null) {
      userData.value = ''
    } else if (_report.data.length > 0) {
      userData.value = _report.data
    }
  } finally {
      isLoading.value = false
  }
}
onMounted(async () => {
  await fetchData()
})
// watch(dataEncrypt, async () => {
//   await fetchData()
// })
// Load more
const visiblePackages = computed(() => {
  return userData.value.slice(0, currentPage.value * itemsPerPage.value)
})
const canLoadMore = computed(() => {
  return visiblePackages.value.length < userData.value.length
})
const loadMore = async () => {
  if (!canLoadMore.value || isLoading.value) return
  isLoadingMore.value = true
  // Simulate async loading with a timeout
  await new Promise((resolve) => setTimeout(resolve, 1000))
  currentPage.value++
  isLoadingMore.value = false
}
</script>
<template>
  <div class="px-7">
    <div class="max-w-full overflow-x-auto bg-gray-50">
      <div
        v-if="isLoading"
        class="flex flex-col justify-center items-center bg-gray-100 min-h-screen"
      >
        <div class="mb-60">
          <Loading />
        </div>
      </div>
      <div
        v-else-if="!isLoading && visiblePackages.length <= 0"
        class="flex flex-col justify-center items-center bg-gray-100 min-h-screen border-t"
      >
        <img src="@/assets/images/icon/empty-folder.png" alt="" class="w-20 mb-60" />
      </div>
      <table v-else class="w-full table-auto text-sm">
        <thead>
          <tr
            class="bg-gray-100 border-t border-b text-left dark:bg-meta-4 text-black text-center uppercase"
          >
            <th class="py-4 px-4 dark:text-white border border-black">
              {{ t('date') }}
            </th>
            <th class="py-4 px-4 dark:text-white border border-black">Tran.No</th>
            <th class="py-4 px-4 dark:text-white border border-black">EVENT</th>
            <th class="py-4 px-4 dark:text-white border border-black">Entires No</th>
            <th class="py-4 px-4 dark:text-white border border-black">Related acc</th>
            <th class="py-4 px-4 dark:text-white border border-black">cheque no</th>
            <th class="py-4 px-4 dark:text-white border border-black">
              {{ t('description') }}
            </th>
            <th class="py-4 px-4 dark:text-white border border-black">
              {{ t('withdraw') }}
            </th>
            <th class="py-4 px-4 dark:text-white border border-black">
              {{ t('deposit') }}
            </th>

            <th class="py-4 px-4 dark:text-white border border-black">
              {{ t('balance') }}
            </th>
            <th class="py-4 px-4 dark:text-white border border-black">User</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in visiblePackages" :key="index" class="text-center">
            <td class="py-5 px-4 border border-black">
              <p class="text-black dark:text-white">{{ formatDateTime(item.TRN_DATE) }}</p>
            </td>
            <td class="py-5 px-4 border border-black">
              <p class="text-black dark:text-white">{{ item.TRN_REF_NO }}</p>
            </td>
            <td class="py-5 px-4 border border-black">
              <p class="text-black dark:text-white">{{ item.EVENT }}</p>
            </td>
            <td class="py-5 px-4 border border-black">
              <p class="text-black dark:text-white">{{ item.EVENT_SR_NO }}</p>
            </td>
            <td class="py-5 px-4 border border-black">
              <p class="text-black dark:text-white">{{ item.RELATED_ACCOUNT }}</p>
            </td>
            <td class="py-5 px-4 border border-black">
              <p class="text-black dark:text-white">{{ item.INSTRUMENT_CODE }}</p>
            </td>
            <td class="py-5 px-4 border border-black">
              <p class="text-black dark:text-white">{{ item.DESCRIPTION }}</p>
            </td>
            <td class="items-center py-5 px-4 border border-black">
              <p class="text-black dark:text-white">{{ formatNumber(item.WITHDRAW) }}</p>
            </td>
            <td class="py-5 px-4 border border-black">
              <p class="text-black dark:text-white">{{ formatNumber(item.DEPOSIT) }}</p>
            </td>
            <td class="py-5 px-4 border border-black">
              <p class="text-black dark:text-white">
                {{ formatNumber(item.LUYKE_AMOUNT) }} {{ item.CCY }}
              </p>
            </td>
            <td class="py-5 px-4 border border-black">
              <p class="text-black dark:text-white">
                {{ item.USER_ID }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="visiblePackages.length >= 5" class="text-center mt-3">
      <button @click="loadMore" :disabled="!canLoadMore || isLoadingMore">
        <div v-if="isLoadingMore">
          <Loading />
        </div>
        <div v-else class="py-4">Load More</div>
      </button>
    </div>
  </div>
</template>
@/stores/encryptDecrypt