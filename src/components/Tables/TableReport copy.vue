<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import flatPicker from 'flatpickr'
import { reportFinance, balanceAccount } from '@/service/GetPostAPI'
import { encryptData } from '@/stores/encryptDecrypt'
import { formatNumber, formatDate, formatDateShort, formatDateTime } from '@/service/Format.ts'
import Loading from '@/components/Loading/Loading.vue'
import { useAccountStore } from '@/stores/accountNumber'
import { useRouter } from 'vue-router'
import { PATH } from '@/router/pathName'
import { isTokenExpired } from '@/stores/checkToken'
import { currentLanguage } from '@/i18n'
import { logout } from '@/stores/clearStorage'
const { t } = useI18n()
const check = ref(currentLanguage.value)
const router = useRouter()
const userDataLogin = JSON.parse(localStorage.getItem('userData'))
const accountNo = ref('')
const accountStore = useAccountStore()
const accountNumber = computed(() => accountStore.value)
const target = ref(null)
const flatPickerInstance = ref(null)
const datePicker = ref(null)
const selectedValueDate = ref('')
const selectedNameDay = ref(null)
const isDropdownOpen = ref(false)
const itemsPerPage = ref(5)
const currentPage = ref(1)
const userData = ref('')
const isLoading = ref(false)
const isLoadingMore = ref(false)
const today = new Date()
const dataEncrypt = ref('')
const dateFrom = ref(formatDate(today))
const dateTo = ref(formatDate(today))
const inputText = ref('')
const dayList = ref([
  { id: 1, name: 'To day', value: 'today', color: 'white', country: 'en' },
  { id: 2, name: 'Yesterday', value: 'yesterday', color: 'white' },
  { id: 3, name: 'Last 3 Days', value: 'last3days', color: 'white' },
  { id: 4, name: 'Last 7 Days', value: 'last7days', color: 'white' },
  { id: 5, name: 'Last 30 Days', value: 'last30days', color: 'white' },
  { id: 6, name: 'Last 60 Days', value: 'last60days', color: 'white' }
])
const dayListLao = ref([
  { id: 1, name: 'ມື້ນີ້', value: 'today', color: 'white', country: 'la' },
  { id: 2, name: 'ມື້ວານ', value: 'yesterday', color: 'white' },
  { id: 3, name: '3 ມື້ກ່ອນ', value: 'last3days', color: 'white' },
  { id: 4, name: '7 ມື້ກ່ອນ', value: 'last7days', color: 'white' },
  { id: 5, name: '30 ມື້ກ່ອນ', value: 'last30days', color: 'white' },
  { id: 6, name: '60 ມື້ກ່ອນ', value: 'last60days', color: 'white' }
])
const dayListViet = ref([
  { id: 1, name: 'Hôm nay', value: 'today', color: 'white', country: 'vn' },
  { id: 2, name: 'Hôm qua', value: 'yesterday', color: 'white' },
  { id: 3, name: '3 ngày trước', value: 'last3days', color: 'white' },
  { id: 4, name: '7 ngày trước', value: 'last7days', color: 'white' },
  { id: 5, name: '30 ngày trước', value: 'last30days', color: 'white' },
  { id: 6, name: '60 ngày trước', value: 'last60days', color: 'white' }
])
const checkToken = () => {
  const token = localStorage.getItem('authToken')
  // const token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJCcm5Db2RlIjoiMDEwIiwiRGVwQ29kZSI6IkxWQjAxMDAxNiIsIkVtYWlsIjoibWFpbEBtYWlsLmNvbSIsIkVtcE5hbWUiOiJBRE1JTiIsIlJvbGVDb2RlIjoiQURNSU4iLCJVc2VyQWQiOiJBRE1JTiIsImV4cCI6MTczNzQ2MjU2NCwiaXNFbXAiOiJZIn0.wSmXwvNqp75i2-_HrEJBNLpZ-xtsCnBKVC-UXYZpFMI'
  if (!token) {
    console.log('No token found.')
    return
  }
  if (isTokenExpired(token)) {
    logout()
    console.log('Token has expired.')
    // Perform actions like redirecting to login or refreshing the token
  } else {
    console.log('Token is still valid.')
  }
}
watch(currentLanguage, (newLanguage) => {
  check.value = newLanguage
  if (newLanguage === 'en') {
    const todayAccount = dayList.value.find((account) => account.country === 'en')
    if (todayAccount) {
      selectedNameDay.value = todayAccount
      selectedValueDate.value = todayAccount.value
    }
  } else if (newLanguage === 'vn') {
    const todayAccountViet = dayListViet.value.find((account) => account.country === 'vn')
    if (todayAccountViet) {
      selectedNameDay.value = todayAccountViet
      selectedValueDate.value = todayAccountViet.value
    }
  } else if (newLanguage === 'la') {
    const todayAccountLao = dayListLao.value.find((account) => account.country === 'la')
    if (todayAccountLao) {
      selectedNameDay.value = todayAccountLao
      selectedValueDate.value = todayAccountLao.value
    }
  }
})

const fetchData = async () => {
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
    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  }
}
watch(dataEncrypt, async () => {
  await fetchData()
})
const handleEnter = () => {
  console.log('Entered text:', dateText.value)
  alert(`You pressed Enter! Text: ${dateText.value}`)
  // Add your logic here for what should happen on Enter key press
}
const calculateDateRange = (daysAgo) => {
  const startDate = new Date()
  startDate.setDate(today.getDate() - daysAgo)
  return { startDate, endDate: today }
}
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
const selectAccount = async (account) => {
  selectedNameDay.value = account
  selectedValueDate.value = account.value
  !isDropdownOpen.value
  if (!flatPickerInstance.value) return
  let range = { startDate: null, endDate: null }
  switch (selectedValueDate.value) {
    case 'today':
      range = { startDate: today, endDate: today }
      break
    case 'yesterday':
      range = calculateDateRange(1)
      break
    case 'last3days':
      range = calculateDateRange(3)
      break
    case 'last7days':
      range = calculateDateRange(7)
      break
    case 'last30days':
      range = calculateDateRange(30)
      break
    case 'last60days':
      range = calculateDateRange(60)
      break
    default:
      range = { startDate: null, endDate: null }
      break
  }
  if (range.startDate && range.endDate) {
    flatPickerInstance.value.setDate([range.startDate, range.endDate])
    const formattedRange = `${formatDateShort(range.startDate)} - ${formatDateShort(range.endDate)}`
    datePicker.value.value = formattedRange
    dateFrom.value = formatDate(range.startDate)
    dateTo.value = formatDate(range.endDate)
    let data_En = {
      branch_id: userDataLogin?.BRANCH_ID,
      account_no: accountNumber,
      from_date: formatDate(range.startDate),
      to_date: formatDate(range.endDate)
    }
    dataEncrypt.value = data_En
  }
}
onMounted(async () => {
  checkToken()
  const body = {
    data: encryptData(userDataLogin?.CIF)
  }
  const _account = await balanceAccount(body)
  if (_account.data.length > 0) {
    accountNo.value = _account.data[0]?.ACCOUNT
  }
  dataEncrypt.value = {
    branch_id: userDataLogin?.BRANCH_ID,
    account_no: accountNo.value,
    from_date: formatDate(today),
    to_date: formatDate(today)
  }
  const todayAccount = dayList.value.find((account) => account.country === 'en')
  const todayAccountViet = dayListViet.value.find((account) => account.country === 'vn')
  const todayAccountLao = dayListLao.value.find((account) => account.country === 'la')
  if (check.value === 'en') {
    selectedNameDay.value = todayAccount
    selectedValueDate.value = todayAccount.value
  }
  if (check.value === 'vn') {
    selectedNameDay.value = todayAccountViet
    selectedValueDate.value = todayAccountViet.value
  }
  if (check.value === 'la') {
    selectedNameDay.value = todayAccountLao
    selectedValueDate.value = todayAccountLao.value
  }
  const threeMonthsAgo = new Date()
  threeMonthsAgo.setMonth(today.getMonth() - 3)
  flatPickerInstance.value = flatPicker(datePicker.value, {
    mode: 'range',
    dateFormat: 'd/m/Y',
    minDate: threeMonthsAgo,
    maxDate: today,
    defaultDate: [today],
    onChange: async (selectedDates) => {
      if (selectedDates.length === 2) {
        const formattedRange = `${formatDateShort(selectedDates[0])} - ${formatDateShort(
          selectedDates[1]
        )}`
        dateFrom.value = formatDate(selectedDates[0])
        dateTo.value = formatDate(selectedDates[1])
        let data_En = {
          branch_id: userDataLogin?.BRANCH_ID,
          account_no: accountNumber,
          from_date: formatDate(selectedDates[0]),
          to_date: formatDate(selectedDates[1])
        }
        dataEncrypt.value = data_En
        datePicker.value.value = formattedRange
      }
    }
  })
})
onClickOutside(target, () => {
  isDropdownOpen.value = false
})
//Button view
const handleView = () => {
  router.push({
    path: PATH.PREVIEW_PAGE,
    query: {
      data: encodeURIComponent(JSON.stringify(userData.value)),
      date: encodeURIComponent(JSON.stringify({ dataFrom: dateFrom, dataTo: dateTo }))
    }
  })
}
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
  <div class="max-w-full overflow-x-auto border border-gray-200 bg-gray-50 rounded-2">
    <div class="flex flex-grow items-center justify-between py-3 px-4">
      <div class="flex justify-center items-center">
        <div class="inline-flex items-center rounded-2 border border-stroke dark:border-dark-3">
          <div>
            <div class="dropdown-container-date flex border-r border-stroke text-gray-500">
              <div class="dropdown-date" @click="toggleDropdown" ref="target">
                <div class="dropdown-selected-date">
                  {{ selectedNameDay ? selectedNameDay.name : '' }}
                  <div class="ml-25 px-2">
                    <svg
                      class="absolute top-1/2 -translate-y-1/2 fill-current"
                      :class="{ 'rotate-180': isDropdownOpen }"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                        fill=""
                      />
                    </svg>
                  </div>
                </div>
                <ul v-if="isDropdownOpen" class="dropdown-list-date">
                  <li
                    v-for="account in check === 'en'
                      ? dayList
                      : check === 'vn'
                        ? dayListViet
                        : dayListLao"
                    :key="account.id"
                    :style="{
                      backgroundColor: account.id === selectedNameDay?.id ? 'lightgray' : ''
                    }"
                    class="dropdown-item-date"
                    @click="selectAccount(account)"
                  >
                    {{ account.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="relative flex items-center">
            <span class="absolute left-0 pl-2 text-dark-5">
              <!-- Calendar Icon SVG -->
              <svg
                class="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 3.3125H15.8125V2.625C15.8125 2.25 15.5 1.90625 15.0937 1.90625C14.6875 1.90625 14.375 2.21875 14.375 2.625V3.28125H5.59375V2.625C5.59375 2.25 5.28125 1.90625 4.875 1.90625C4.46875 1.90625 4.15625 2.21875 4.15625 2.625V3.28125H2.5C1.4375 3.28125 0.53125 4.15625 0.53125 5.25V16.125C0.53125 17.1875 1.40625 18.0937 2.5 18.0937H17.5C18.5625 18.0937 19.4687 17.2187 19.4687 16.125V5.25C19.4687 4.1875 18.5625 3.3125 17.5 3.3125ZM2.5 4.71875H4.1875V5.34375C4.1875 5.71875 4.5 6.0625 4.90625 6.0625C5.3125 6.0625 5.625 5.75 5.625 5.34375V4.71875H14.4687V5.34375C14.4687 5.71875 14.7812 6.0625 15.1875 6.0625C15.5937 6.0625 15.9062 5.75 15.9062 5.34375V4.71875H17.5C17.8125 4.71875 18.0625 4.96875 18.0625 5.28125V7.34375H1.96875V5.28125C1.96875 4.9375 2.1875 4.71875 2.5 4.71875ZM17.5 16.6562H2.5C2.1875 16.6562 1.9375 16.4062 1.9375 16.0937V8.71875H18.0312V16.125C18.0625 16.4375 17.8125 16.6562 17.5 16.6562Z"
                  fill=""
                />
                <path
                  d="M9 9.59375H8.3125C8.125 9.59375 8 9.71875 8 9.90625V10.5938C8 10.7813 8.125 10.9062 8.3125 10.9062H9C9.1875 10.9062 9.3125 10.7813 9.3125 10.5938V9.90625C9.3125 9.71875 9.15625 9.59375 9 9.59375Z"
                  fill=""
                />
                <path
                  d="M11.8438 9.59375H11.1562C10.9687 9.59375 10.8438 9.71875 10.8438 9.90625V10.5938C10.8438 10.7813 10.9687 10.9062 11.1562 10.9062H11.8438C12.0313 10.9062 12.1562 10.7813 12.1562 10.5938V9.90625C12.1562 9.71875 12.0313 9.59375 11.8438 9.59375Z"
                  fill=""
                />
                <path
                  d="M14.6875 9.59375H14C13.8125 9.59375 13.6875 9.71875 13.6875 9.90625V10.5938C13.6875 10.7813 13.8125 10.9062 14 10.9062H14.6875C14.875 10.9062 15 10.7813 15 10.5938V9.90625C15 9.71875 14.875 9.59375 14.6875 9.59375Z"
                  fill=""
                />
                <path
                  d="M6 12H5.3125C5.125 12 5 12.125 5 12.3125V13C5 13.1875 5.125 13.3125 5.3125 13.3125H6C6.1875 13.3125 6.3125 13.1875 6.3125 13V12.3125C6.3125 12.125 6.15625 12 6 12Z"
                  fill=""
                />
                <path
                  d="M9 12H8.3125C8.125 12 8 12.125 8 12.3125V13C8 13.1875 8.125 13.3125 8.3125 13.3125H9C9.1875 13.3125 9.3125 13.1875 9.3125 13V12.3125C9.3125 12.125 9.15625 12 9 12Z"
                  fill=""
                />
                <path
                  d="M11.8438 12H11.1562C10.9687 12 10.8438 12.125 10.8438 12.3125V13C10.8438 13.1875 10.9687 13.3125 11.1562 13.3125H11.8438C12.0313 13.3125 12.1562 13.1875 12.1562 13V12.3125C12.1562 12.125 12.0313 12 11.8438 12Z"
                  fill=""
                />
                <path
                  d="M14.6875 12H14C13.8125 12 13.6875 12.125 13.6875 12.3125V13C13.6875 13.1875 13.8125 13.3125 14 13.3125H14.6875C14.875 13.3125 15 13.1875 15 13V12.3125C15 12.125 14.875 12 14.6875 12Z"
                  fill=""
                />
                <path
                  d="M6 14.4062H5.3125C5.125 14.4062 5 14.5312 5 14.7187V15.4063C5 15.5938 5.125 15.7187 5.3125 15.7187H6C6.1875 15.7187 6.3125 15.5938 6.3125 15.4063V14.7187C6.3125 14.5312 6.15625 14.4062 6 14.4062Z"
                  fill=""
                />
                <path
                  d="M9 14.4062H8.3125C8.125 14.4062 8 14.5312 8 14.7187V15.4063C8 15.5938 8.125 15.7187 8.3125 15.7187H9C9.1875 15.7187 9.3125 15.5938 9.3125 15.4063V14.7187C9.3125 14.5312 9.15625 14.4062 9 14.4062Z"
                  fill=""
                />
                <path
                  d="M11.8438 14.4062H11.1562C10.9687 14.4062 10.8438 14.5312 10.8438 14.7187V15.4063C10.8438 15.5938 10.9687 15.7187 11.1562 15.7187H11.8438C12.0313 15.7187 12.1562 15.5938 12.1562 15.4063V14.7187C12.1562 14.5312 12.0313 14.4062 11.8438 14.4062Z"
                  fill=""
                />
              </svg>
            </span>
            <!-- Date picker -->
            <input
              v-model="inputText"
              ref="datePicker"
              type="text"
              class="w-full bg-transparent pl-[40px] text-dark-2 outline-none transition"
              @keyup.enter="handleEnter"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center">
        <ul class="flex items-center gap-2">
          <li>
            <div class="">
              <button
                v-if="visiblePackages.length > 0"
                @click="handleView"
                class="hidden sm:block max-w-sm mx-auto rounded-lg bg-primary px-4 py-1 text-whiter"
              >
                view
              </button>
              <div v-else></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
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
    <table v-else class="w-full table-auto">
      <thead>
        <tr class="bg-gray-100 border-t border-b text-center">
          <th class="py-4 px-4 font-medium text-black">{{ t('date') }}</th>
          <th class="py-4 px-4 font-medium text-black">{{ t('tran_no') }}</th>
          <th class="min-w-[110px] py-4 px-4 font-medium text-black">{{ t('type') }}</th>
          <th class="min-w-[200px] py-4 px-4 min-w-[150px] font-medium text-black">
            {{ t('amount') }}
          </th>
          <th class="py-4 px-4 font-medium text-black">
            {{ t('description') }}
          </th>
          <th class="py-4 px-4 font-medium text-black">{{ t('balance') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in visiblePackages" :key="index">
          <td class="py-5 px-4 border-b">
            <p class="text-black text-center">{{ formatDateTime(item.TRN_DATE) }}</p>
          </td>
          <td class="py-5 px-4 border-b text-center">
            <p class="text-black">{{ item.TRN_REF_NO }}</p>
          </td>
          <td class="items-center py-5 px-4 border-b">
            <div v-if="item.WITHDRAW === '0'" class="flex gap-2">
              <img
                src="/src/assets/images/logo/receive.png"
                alt="receive"
                class="w-5 h-5 rounded-max"
              />
              <p class="text-green-700">{{ t('receive') }}</p>
            </div>
            <div v-else class="flex gap-2">
              <img src="/src/assets/images/logo/sent.png" alt="sent" class="w-5 h-5 rounded-max" />
              <p class="text-red-500">{{ t('sent') }}</p>
            </div>
          </td>
          <td class="py-5 px-4 border-b text-center">
            <div v-if="item.WITHDRAW > '0'" class="flex flex-col items-center justify-center">
              <div class="flex gap-3 items-center justify-center">
                <p class="text-red-500">- {{ formatNumber(item.WITHDRAW) }}</p>
                <div v-if="item.CCY === 'LAK'" class="flex items-center justify-center">
                  <img src="@/assets/images/flags/laos-flag3.png" alt="" class="w-7" />
                </div>
                <div v-else-if="item.CCY === 'BATH'" class="flex items-center justify-center">
                  <img src="@/assets/images/flags/thai-flag.png" alt="" class="w-7" />
                </div>
                <div v-else class="flex items-center justify-center">
                  <img src="@/assets/images/flags/laos-flag3.png" alt="" class="w-7" />
                </div>
              </div>
            </div>
            <div v-else class="flex flex-col items-center justify-center">
              <div class="flex gap-3 items-center justify-center">
                <p class="text-green-700 dark:text-white">+ {{ formatNumber(item.DEPOSIT) }}</p>
                <div v-if="item.CCY === 'LAK'" class="flex gap-1 items-center justify-center">
                  <img src="@/assets/images/flags/laos-flag3.png" alt="" class="w-7" />
                </div>
                <div v-else-if="item.CCY === 'BATH'" class="flex gap-1 items-center justify-center">
                  <img src="@/assets/images/flags/thai-flag.png" alt="" class="w-6" />
                  <p class="text-black">{{ item.CCY }}</p>
                </div>
                <div v-else class="flex gap-1 items-center justify-center">
                  <img src="@/assets/images/flags/usa.png" alt="" class="w-6" />
                  <p class="text-black">{{ item.CCY }}</p>
                </div>
              </div>
            </div>
          </td>

          <td class="py-5 px-4 border-b text-center">
            <p class="text-black">{{ item.DESCRIPTION }}</p>
          </td>
          <td class="py-5 px-4 border-b">
            <div class="flex gap-3 items-center justify-center">
              <p class="text-black text-center">
                {{ formatNumber(item.LUYKE_AMOUNT) }}
              </p>
              <div v-if="item.CCY === 'LAK'" class="flex gap-1 items-center">
                <img src="@/assets/images/flags/laos-flag3.png" alt="" class="w-7" />
              </div>
              <div v-else-if="item.CCY === 'BATH'" class="flex gap-1 items-center">
                <img src="@/assets/images/icon/coin-kip.png" alt="" class="w-6" />
              </div>
              <div v-else class="flex gap-1 items-center">
                <img src="@/assets/images/icon/coin-kip.png" alt="" class="w-6" />
              </div>
            </div>
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
      <div v-else class="border border-gray-200 py-1 px-4 rounded-3 bg-gray-50 hover:bg-gray-100">
        Load More
      </div>
    </button>
  </div>
</template>

<style>
.dropdown-container-date {
  position: relative;
  width: 150px;
}

.dropdown-date {
  cursor: pointer;
  border-radius: 5px;
  position: relative;
}

.dropdown-selected-date {
  padding: 5px 15px;
  border-radius: 5px;
}

.dropdown-list-date {
  list-style: none;
  margin: 10px 0 0 0;
  padding: 0;
  position: absolute;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-item-date {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dropdown-item-date:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
@/stores/encryptDecrypt