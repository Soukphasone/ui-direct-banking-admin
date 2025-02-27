<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { customerList } from '@/service/GetPostAPI'
import Loading from '@/components/Loading/Loading.vue'
import { useSearchStore } from '@/stores/search'

const store = useSearchStore()
const { t } = useI18n()
const dataCustomerList = ref([])
const searchQuery = ref('')
const isLoading = ref(false)
const isLoadingMore = ref(false)
const itemsPerPage = ref(10) // Number of items to load per page
const currentPage = ref(1)
const isChecked = ref(false)
const dataTest = ref([
  {
    branch: 'B001',
    customerID: '100948301',
    userName: 'jdoe',
    FULLNAME: 'John Doe',
    create_date: '2025-02-24T08:30:00Z',
    makerID: 'MK1001',
    description: 'New account created',
    Authorize_status: 'U'
  },
  {
    branch: 'B002',
    customerID: '100948302',
    userName: 'asmith',
    FULLNAME: 'Alice Smith',
    create_date: '2025-02-23T12:45:00Z',
    makerID: 'MK1002',
    description: 'Updated account details',
    Authorize_status: 'Y'
  },
  {
    branch: 'B003',
    customerID: '100948303',
    userName: 'bwilliams',
    FULLNAME: 'Bob Williams',
    create_date: '2025-02-22T14:20:00Z',
    makerID: 'MK1003',
    description: 'Password reset',
    Authorize_status: 'U'
  },
  {
    branch: 'B001',
    customerID: '100948304',
    userName: 'cjohnson',
    FULLNAME: 'Charlie Johnson',
    create_date: '2025-02-21T16:55:00Z',
    makerID: 'MK1004',
    description: 'New loan request',
    Authorize_status: 'U'
  },
  {
    branch: 'B002',
    customerID: '100948305',
    userName: 'dmiller',
    FULLNAME: 'Diana Miller',
    create_date: '2025-02-20T10:05:00Z',
    makerID: 'MK1005',
    description: 'Card replacement request',
    Authorize_status: 'U'
  },
  {
    branch: 'B003',
    customerID: '100948306',
    userName: 'ewilson',
    FULLNAME: 'Ethan Wilson',
    create_date: '2025-02-19T11:30:00Z',
    makerID: 'MK1006',
    description: 'Email address updated',
    Authorize_status: 'U'
  },
  {
    branch: 'B001',
    customerID: '100948307',
    userName: 'fthomas',
    FULLNAME: 'Fiona Thomas',
    create_date: '2025-02-18T09:15:00Z',
    makerID: 'MK1007',
    description: 'Transaction dispute filed',
    Authorize_status: 'U'
  },
  {
    branch: 'B002',
    customerID: '100948308',
    userName: 'ggarcia',
    FULLNAME: 'George Garcia',
    create_date: '2025-02-17T13:40:00Z',
    makerID: 'MK1008',
    description: 'Address update request',
    Authorize_status: 'U'
  },
  {
    branch: 'B003',
    customerID: '100948309',
    userName: 'hhall',
    FULLNAME: 'Hannah Hall',
    create_date: '2025-02-16T15:25:00Z',
    makerID: 'MK1009',
    description: 'New credit card application',
    Authorize_status: 'U'
  },
  {
    branch: 'B001',
    customerID: '101948300',
    userName: 'ijones',
    FULLNAME: 'Ian Jones',
    create_date: '2025-02-15T17:50:00Z',
    makerID: 'MK1010',
    description: 'Account closure request',
    Authorize_status: 'N'
  }
])
const toggleCheck = (index) => {
  isChecked.value = !isChecked.value
  if (isChecked.value === true) {
    console.log('CheckBox:', index)
  } else {
    console.log('CheckBox:', 'None')
  }
}
watch(
  () => store.message,
  (setSearch) => {
    searchQuery.value = setSearch
  }
)
// const fetchData = async () => {
//   isLoading.value = true
//   try {
//     const body = {
//       branch_id: 'ALL',
//       cif: 'ALL'
//     }
//     const _report = await customerList(body)
//     dataCustomerList.value = _report.data
//     console.log('CustomerList', _report)
//     if (_report.data === null) {
//       dataCustomerList.value = []
//     } else if (_report.data.length > 0) {
//       dataCustomerList.value = _report.data
//     }
//   } finally {
//     setTimeout(() => {
//       isLoading.value = false
//     }, 1000)
//   }
// }
// onMounted(fetchData)
const filteredItems = computed(() => {
  return dataTest.value
    .filter(
      (item) =>
        item.customerID.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.branch.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.userName.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .slice(0, currentPage.value * itemsPerPage.value)
})
const canLoadMore = computed(() => {
  return filteredItems.value.length < dataTest.value.length
})

const loadMore = () => {
  isLoadingMore.value = true
  setTimeout(() => {
    isLoadingMore.value = false
    currentPage.value++
  }, 1000)
}
const selectedItems = ref([])

// Computed property to check if all are selected
const isAllSelected = computed(() => selectedItems.value.length === dataTest.value.length)

// Toggle Select All
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedItems.value = []
  } else {
    selectedItems.value = [...dataTest.value]
  }
}

// Toggle individual checkbox
const toggleSelection = (item) => {
  const index = selectedItems.value.findIndex((i) => i.customerID === item.customerID)
  if (index !== -1) {
    selectedItems.value.splice(index, 1)
  } else {
    selectedItems.value.push(item)
  }
}
</script>
<template>
  <!-- <div>
    <label>
      <input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll" />
      Select All
    </label>
    <ul>
      <li v-for="item in checkboxes" :key="item.id">
        <label>
          <input
            type="checkbox"
            :checked="selectedItems.some((i) => i.id === item.id)"
            @change="toggleSelection(item)"
          />
          {{ item.name }}
        </label>
      </li>
    </ul>

    <h3>Selected Data:</h3>
    <pre>{{ selectedItems }}</pre>
  </div> -->
  <div class="max-w-full overflow-x-auto border border-gray-200 bg-gray-50 rounded-2">
    <div class="flex flex-grow items-center justify-between py-3 px-4">
      <div>Total users: {{ dataTest.length }}</div>
      <div>{{ selectedItems.length }}</div>
      <div class="flex items-center">
        <ul class="flex items-center gap-2">
          <li></li>
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
      v-else-if="!isLoading && dataTest.length <= 0"
      class="flex flex-col justify-center items-center bg-gray-100 min-h-screen border-t"
    >
      <div class="flex flex-col items-center justify-center mb-60">
        <svg
          class="w-20 h-20 text-red-600 animate-pulse"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="50" cy="50" r="40" class="opacity-50" />
          <line x1="30" y1="30" x2="70" y2="70" class="opacity-75" />
          <line x1="70" y1="30" x2="30" y2="70" class="opacity-75" />
        </svg>
        <p class="mt-2 text-gray-500 text-sm">{{ t('no_data') }}</p>
      </div>
    </div>
    <table v-else class="w-full table-auto min-h-25">
      <thead>
        <tr class="bg-gray-100 border-t border-b text-center">
          <th class="p-2 font-medium text-black">
            <label class="flex items-center justify-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                :checked="isAllSelected"
                @change="toggleSelectAll"
                class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </label>
          </th>
          <th class="p-2 px-4 font-medium text-black">{{ t('stt') }}</th>
          <th class="p-2 px-4 font-medium text-black">{{ t('branch') }}</th>
          <th class="p-2 px-4 font-medium text-black">{{ t('account_number') }}</th>
          <th class="p-2 px-4 font-medium text-black">{{ t('user_name') }}</th>
          <th class="p-2 px-4 font-medium text-black">{{ t('full_name') }}</th>
          <th class="p-2 px-4 font-medium text-black">{{ t('created_at') }}</th>
          <th class="p-2 px-4 font-medium text-black">{{ t('maker_id') }}</th>
          <th class="p-2 px-4 min-w-[150px] font-medium text-black">
            {{ t('description') }}
          </th>

          <th class="p-2 px-4 min-w-[150px] font-medium text-black">
            {{ t('authorize_status') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredItems" :key="item.customerID">
          <td class="p-2 border-b">
            <label class="flex items-center justify-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                :checked="selectedItems.some((i) => i.customerID === item.customerID)"
                @change="toggleSelection(item)"
                class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </label>
          </td>
          <td class="p-2 border-b">
            <p class="text-black text-center">{{ index + 1 }}</p>
          </td>
          <td class="p-2 border-b">
            <p class="text-black text-center">{{ item.branch }}</p>
          </td>
          <td class="p-2 border-b">
            <p class="text-black text-center">{{ item.customerID }}</p>
          </td>
          <td class="p-2 border-b">
            <p class="text-black text-center">{{ item.userName }}</p>
          </td>
          <td class="min-w-45 border-b">
            <p class="text-black text-center">{{ item.FULLNAME }}</p>
          </td>
          <td class="min-w-45 border-b">
            <p class="text-black text-center">{{ item.create_date }}</p>
          </td>
          <td class="min-w-45 border-b">
            <p class="text-black text-center">{{ item.makerID }}</p>
          </td>
          <td class="items-center px-4 border-b">
            <p class="text-black text-center">{{ item.description }}</p>
          </td>
          <td class="items-center px-4 border-b">
            <p class="text-black text-center">{{ item.Authorize_status }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex items-center justify-center text-center mt-3">
    <div v-if="isLoadingMore">
      <Loading size="25" />
    </div>
    <button
      v-else-if="canLoadMore"
      class="p-1 px-2 border border-gray-300 bg-white rounded-xl hover:bg-gray-100"
      @click="loadMore"
    >
      Load More
    </button>
  </div>
</template>
