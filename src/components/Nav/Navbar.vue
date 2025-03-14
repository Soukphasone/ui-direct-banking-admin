<script setup>
import { onMounted, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { formatNumber } from '@/service/Format'
import { balanceAccount } from '@/service/GetPostAPI'
import { encryptData } from '@/stores/encryptDecrypt'
import { useAccountStore } from '@/stores/accountNumber'
import { showAlert } from '@/stores/alert'
import { useI18n } from 'vue-i18n'

// Customer information
const userData = JSON.parse(localStorage.getItem('userData'))
const target = ref(null)
const copied = ref(false)
const { t } = useI18n()

// Reactive state
const isVisible = ref(false)
const accountList = ref([])
const accountListTest = ref([
  { ACCOUNT: '01000210418076', BALANCE: '5547766', CURRENCY: 'LAK' },
  { ACCOUNT: '01000210418088', BALANCE: '1000', CURRENCY: 'THB' },
  { ACCOUNT: '01000210418099', BALANCE: '50', CURRENCY: 'USD' }
])
// select dropDown
const selectedAccountNumber = useAccountStore()
const selectedAccount = ref('')
const isDropdownOpen = ref(false)
const toggleVisibility = () => {
  isVisible.value = !isVisible.value
}
// ---->
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
const selectAccount = (account) => {
  localStorage.setItem('accountNumber', account.ACCOUNT)
  selectedAccountNumber.value = account.ACCOUNT
  selectedAccount.value = account
  !isDropdownOpen.value
  refreshAccount()
}
// ---->
onClickOutside(target, () => {
  isDropdownOpen.value = false
})
const fetchData = async () => {
  const body = {
    data: encryptData(userData?.CIF)
  }
  const _account = await balanceAccount(body)
  if (_account.data.length > 0) {
    accountList.value = _account.data
    selectedAccount.value = accountList.value[0]
    selectedAccountNumber.value = accountList.value[0]?.ACCOUNT
    localStorage.setItem('accountNumber', accountList.value[0]?.ACCOUNT)
  }
}
onMounted(() => {
  fetchData()
})
const copyText = async () => {
  try {
    await navigator.clipboard.writeText(selectedAccount.value.ACCOUNT)
    copied.value = true
    showAlert(
      t('copy'),
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
    setTimeout(() => (copied.value = false), 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>
<template>
  <div class="px-4">
    <div class="rounded-3 py-1 text-whiter nav-header">
      <div class="flex flex-grow items-center justify-between py-2 px-4">
        <div class="">
          <div class="max-w-lg mx-auto">
            <div v-if="userData" class="flex items-center">
              <h2 class="text-sm text-whiter">{{ $t('total_balance') }}</h2>
              <button
                @click="toggleVisibility"
                class="focus:outline-none ml-3"
                aria-label="Toggle balance visibility"
              >
                <span v-if="isVisible">
                  <!-- Eye Off Icon -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6 text-whiter hover:text-gray-300"
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
                  <!-- Eye Open Icon -->
                  <svg
                    viewBox="'0 0 24 24'"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 hover:text-gray-300"
                  >
                    <path
                      d="M12 4C7 4 2.73 7.11 1 12c1.73 4.89 6 8 11 8s9.27-3.11 11-8c-1.73-4.89-6-8-11-8Zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6Zm0-10a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <div v-else class="text-sm sm:text-lg mb-2">{{ $t('welcome') }}</div>
            <div
              v-if="userData"
              class="mt-1 text-xl text-whiter transition-opacity duration-300"
              :class="{ 'opacity-1': !isVisible }"
            >
              <div class="flex items-center text-lg gap-3">
                <p v-if="isVisible">
                  {{ formatNumber(selectedAccount.BALANCE)}}
                </p>
                <p v-else>XXX,XXX,XXX</p>
                <p>
                  {{ selectedAccount.CURRENCY }}
                </p>
              </div>
              <div class="text-sm">
                <div class="flex gap-2">
                  <p>{{ selectedAccount.ACCOUNT || '000x 000x 000x'}}</p>
                  <button @click="copyText" class="copy-button focus:outline-none">
                    <img
                      v-if="!copied"
                      src="@/assets/images/icon/icon-copy.png"
                      alt=""
                      class="w-5"
                    />
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="copy-icon copied-icon"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div v-else class="text-sm sm:text-lg">{{ $t('direct_banking') }}</div>
          </div>
        </div>
        <div v-if="userData" style="margin-top: -15px">
          <div class="flex max-w-sm mx-auto relative">
            <div class="dropdown-container-account flex">
              <button
                class="dropdown-account focus:outline-none"
                @click="toggleDropdown"
                @keydown.esc="isDropdownOpen = false"
                ref="target"
              >
                <div class="dropdown-selected-account text-sm text-center">
                  <span class="mr-2" v-if="selectedAccount">{{
                    selectedAccount.ACCOUNT || 'ACCOUNT'
                  }}</span>
                  <span class="mr-2" v-else>{{
                  t('account')
                  }}</span>
                  <div class="ml-33">
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
                <ul v-if="isDropdownOpen" class="dropdown-list-account text-sm">
                  <li
                    v-for="account in accountListTest"
                    :key="account.ACCOUNT"
                    :style="{
                      backgroundColor:
                        account.ACCOUNT === selectedAccount?.ACCOUNT ? '#f8f8f8' : '',
                      color: account.ACCOUNT === selectedAccount?.ACCOUNT ? 'red' : ''
                    }"
                    class="flex gap-1.5 dropdown-item-account"
                    @click="selectAccount(account)"
                  >
                    <span> {{ account.ACCOUNT }}</span>
                    <span> {{ account.CURRENCY }}</span>
                  </li>
                </ul>
              </button>
            </div>
          </div>
        </div>

        <!-- <div v-else><DropdownUser /></div> -->
      </div>
    </div>
  </div>
</template>
<style>
/*button copy  */
.copy-icon {
  width: 20px;
  height: 20px;
  stroke: #ffffff;
  transition: stroke 0.3s;
  border-bottom: 1px solid white;
  border-radius: 5px;
}

.copied-icon {
  stroke: #ffffff;
}
/*button copy  */

.dropdown-container-account {
  position: relative;
  color: white;
}

.dropdown-account {
  cursor: pointer;
  border-bottom: 2px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  position: absolute;
  width: 150px;
  right: 0;
  margin-right: 5px;
}

.dropdown-selected-account {
  border-radius: 5px;
}

.dropdown-list-account {
  list-style: none;
  margin: 10px 0 0 0;
  padding: 0;
  position: absolute;
  width: 100%;
  border: 1px solid #f1f1f1;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: black;
}

.dropdown-item-account {
  padding: 10px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dropdown-item-account:hover {
  background-color: rgba(116, 65, 65, 0.1);
  color: red;
}
</style>
@/stores/encryptDecrypt