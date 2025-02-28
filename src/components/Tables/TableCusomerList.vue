<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { customerList } from '@/service/GetPostAPI'
import Loading from '@/components/Loading/Loading.vue'
import { useSearchStore } from '@/stores/search'
import CustomerEdit from '../Modals/CustomerEdit.vue'
import { useOpenModalStore } from '@/stores/modal'
import { showAlert } from '@/stores/alert'

const store = useSearchStore()
const { t } = useI18n()
const dataCustomerList = ref([])
const searchQuery = ref('')
const isLoading = ref(false)
const isLoadingMore = ref(false)
const itemsPerPage = ref(20) // Number of items to load per page
const currentPage = ref(1)
const isOpenModal = useOpenModalStore()
const dataUpdate = ref([])
const dataTest = ref([
  {
    id: 1,
    CIF: 'CIF001',
    FULLNAME: 'John Doe',
    EMAIL: 'johndoe@example.com',
    TEL: '123-456-7890',
    CREATE_DATE: '01/02/24'
  },
  {
    id: 2,
    CIF: 'CIF002',
    FULLNAME: 'Jane Smith',
    EMAIL: 'janesmith@example.com',
    TEL: '234-567-8901',
    CREATE_DATE: '02/02/24'
  },
  {
    id: 3,
    CIF: 'CIF003',
    FULLNAME: 'Michael Johnson',
    EMAIL: 'michaelj@example.com',
    TEL: '345-678-9012',
    CREATE_DATE: '03/02/24'
  },
  {
    id: 4,
    CIF: 'CIF004',
    FULLNAME: 'Emily Brown',
    EMAIL: 'emilyb@example.com',
    TEL: '456-789-0123',
    CREATE_DATE: '04/02/24'
  },
  {
    id: 5,
    CIF: 'CIF005',
    FULLNAME: 'William Davis',
    EMAIL: 'williamd@example.com',
    TEL: '567-890-1234',
    CREATE_DATE: '05/02/24'
  },
  {
    id: 6,
    CIF: 'CIF006',
    FULLNAME: 'Olivia Martinez',
    EMAIL: 'oliviam@example.com',
    TEL: '678-901-2345',
    CREATE_DATE: '06/02/24'
  },
  {
    id: 7,
    CIF: 'CIF007',
    FULLNAME: 'James Wilson',
    EMAIL: 'jamesw@example.com',
    TEL: '789-012-3456',
    CREATE_DATE: '07/02/24'
  },
  {
    id: 8,
    CIF: 'CIF008',
    FULLNAME: 'Sophia Anderson',
    EMAIL: 'sophiaa@example.com',
    TEL: '890-123-4567',
    CREATE_DATE: '08/02/24'
  },
  {
    id: 9,
    CIF: 'CIF009',
    FULLNAME: 'Benjamin Thomas',
    EMAIL: 'benjamint@example.com',
    TEL: '901-234-5678',
    CREATE_DATE: '09/02/24'
  },
  {
    id: 10,
    CIF: 'CIF010',
    FULLNAME: 'Mia Hernandez',
    EMAIL: 'miah@example.com',
    TEL: '012-345-6789',
    CREATE_DATE: '10/02/24'
  },
  {
    id: 11,
    CIF: 'CIF011',
    FULLNAME: 'Daniel Moore',
    EMAIL: 'danielm@example.com',
    TEL: '123-456-7890',
    CREATE_DATE: '11/02/24'
  },
  {
    id: 12,
    CIF: 'CIF012',
    FULLNAME: 'Isabella White',
    EMAIL: 'isabellaw@example.com',
    TEL: '234-567-8901',
    CREATE_DATE: '12/02/24'
  },
  {
    id: 13,
    CIF: 'CIF013',
    FULLNAME: 'Matthew Harris',
    EMAIL: 'matthewh@example.com',
    TEL: '345-678-9012',
    CREATE_DATE: '13/02/24'
  },
  {
    id: 14,
    CIF: 'CIF014',
    FULLNAME: 'Charlotte Martin',
    EMAIL: 'charlottem@example.com',
    TEL: '456-789-0123',
    CREATE_DATE: '14/02/24'
  },
  {
    id: 15,
    CIF: 'CIF015',
    FULLNAME: 'David Thompson',
    EMAIL: 'davidt@example.com',
    TEL: '567-890-1234',
    CREATE_DATE: '15/02/24'
  },
  {
    id: 16,
    CIF: 'CIF016',
    FULLNAME: 'Amelia Garcia',
    EMAIL: 'ameliag@example.com',
    TEL: '678-901-2345',
    CREATE_DATE: '16/02/24'
  },
  {
    id: 17,
    CIF: 'CIF017',
    FULLNAME: 'Ethan Martinez',
    EMAIL: 'ethanm@example.com',
    TEL: '789-012-3456',
    CREATE_DATE: '17/02/24'
  },
  {
    id: 18,
    CIF: 'CIF018',
    FULLNAME: 'Harper Rodriguez',
    EMAIL: 'harperr@example.com',
    TEL: '890-123-4567',
    CREATE_DATE: '18/02/24'
  },
  {
    id: 19,
    CIF: 'CIF019',
    FULLNAME: 'Alexander Clark',
    EMAIL: 'alexanderc@example.com',
    TEL: '901-234-5678',
    CREATE_DATE: '19/02/24'
  },
  {
    id: 20,
    CIF: 'CIF020',
    FULLNAME: 'Evelyn Lewis',
    EMAIL: 'evelynl@example.com',
    TEL: '012-345-6789',
    CREATE_DATE: '20/02/24'
  }
])

const handleEdit = (value) => {
  dataUpdate.value = value
  isOpenModal.isOpenModalEdit = true
}
const handleDelete = () => {
  showAlert(
    t('delete'),
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
        item.FULLNAME.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.EMAIL.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.CIF.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.TEL.toLowerCase().includes(searchQuery.value.toLowerCase())
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
</script>
<template>
  <div class="max-w-full overflow-x-auto border border-gray-200 bg-gray-50 rounded-2">
    <div class="flex flex-grow items-center justify-between py-3 px-4">
      <div>Total users: {{ dataTest.length }}</div>
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
          <th class="p-2 px-4 font-medium text-black">{{ t('stt') }}</th>
          <th class="p-2 px-4 font-medium text-black">{{ t('account_number_cif') }}</th>
          <th class="p-2 px-4 font-medium text-black">{{ t('full_name') }}</th>
          <th class="p-2 px-4 font-medium text-black">{{ t('created_at') }}</th>
          <th class="p-2 px-4 min-w-[150px] font-medium text-black">
            {{ t('email') }}
          </th>
          <th class="p-2 px-4 font-medium text-black">
            {{ t('tel') }}
          </th>
          <th class="p-2 px-4 font-medium text-black text-center">
            {{ t('edit') }}
          </th>
          <th class="p-2 px-4 font-medium text-black text-center">
            {{ t('delete') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredItems" :key="index">
          <td class="p-2 border-b">
            <p class="text-black text-center">{{ index + 1 }}</p>
          </td>
          <td class="p-2 border-b">
            <p class="text-black text-center">{{ item.CIF }}</p>
          </td>
          <td class="min-w-45 border-b">
            <p class="text-black text-center">{{ item.FULLNAME }}</p>
          </td>
          <td class="min-w-45 border-b">
            <p class="text-black text-center">{{ item.CREATE_DATE }}</p>
          </td>
          <td class="min-w-45 items-center px-4 border-b">
            <p class="text-black text-center">{{ item.EMAIL }}</p>
          </td>
          <td class="items-center px-4 border-b">
            <p class="text-black text-center">{{ item.TEL }}</p>
          </td>
          <td class="border-b">
            <div class="flex justify-center items-center text-center">
              <button
                class="flex gap-2 focus:outline-none"
                @click.prevent="handleEdit(item)"
                @keydown.esc="isOpenModal = false"
              >
                <p class="text-sm">Edit</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-5 h-5 hover:text-blue-500 cursor-pointer"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 3.487a2.39 2.39 0 0 1 3.38 3.38L7.98 19.13l-3.38.75.75-3.38L16.862 3.487z"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </td>
          <td class="border-b">
            <div class="flex justify-center items-center text-center">
              <button class="flex gap-2" @click.prevent="handleDelete">
                <p class="text-sm">Delete</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6 text-red-500 hover:text-red-700 transition"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 3a1 1 0 011-1h4a1 1 0 011 1v1h5a1 1 0 110 2h-1.108l-1.09 12.218A2 2 0 0114.815 20H9.185a2 2 0 01-1.986-1.782L6.108 6H5a1 1 0 110-2h5V3zM8 8a1 1 0 012 0v7a1 1 0 01-2 0V8zm6 0a1 1 0 012 0v7a1 1 0 01-2 0V8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </div>
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
  <CustomerEdit :data="dataUpdate" />
</template>