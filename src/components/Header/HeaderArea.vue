<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'
import ChangeLanguage from '../ChangeLanguage/ChangeLanguage.vue'
import Navbar from '@/components/Nav/Navbar.vue'
import PreviewPage from '@/components/Previews/PreviewPage.vue'
import { exportToPDF } from '@/stores/exportPDF'
import eventBus from '@/eventBus'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import SearchInput from '../Search/SearchInput.vue'
import { useSearchStore } from '@/stores/search'
const { t } = useI18n()
const userData = JSON.parse(localStorage.getItem('userData'))
const checkExport = ref(null)
const contentToExport = ref(null)
const currentPage = useRoute().name
const search = ref('')
const store = useSearchStore()

// const refresh = async () => {
//   await new Promise((resolve) => setTimeout(resolve, 100))
//   const data = JSON.parse(localStorage.getItem('dataReport'))
//   checkExport.value = data
// }
watch(search, (newVal) => {
  store.setMessage(newVal)
})

// onMounted(() => {
//   eventBus.on('refreshPreview', refresh)
// })

// onUnmounted(() => {
//   eventBus.off('refreshPreview', refresh)
// })
// const exportPDF = async () => {
//   if (contentToExport.value) {
//     await exportToPDF(contentToExport.value)
//   }
// }

const { toggleSidebar } = useSidebarStore()
const sidebarStore = useSidebarStore()
</script>

<template>
  <div class="sticky top-0 z-999 w-full bg-whiter">
    <!-- <header class="">
      <div class="flex flex-grow items-center justify-between py-2 px-4">
        <div class="flex items-center gap-2 sm:gap-4">
          <button
            class="z-99999 block rounded-max hover:bg-gray-200 p-1.5 hover:shadow-sm focus:outline-none"
            @click="
              () => {
                toggleSidebar()
              }
            "
            @keydown.esc="sidebarStore.isSidebarOpen = false"
          >
            <span class="relative block h-5.5 w-5.5 cursor-pointer">
              <span class="block absolute right-0 h-full w-full">
                <span
                  class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out"
                  :class="{ '!w-full delay-300': !sidebarStore.isSidebarOpen }"
                ></span>
                <span
                  class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out"
                  :class="{ '!w-full delay-400': !sidebarStore.isSidebarOpen }"
                ></span>
                <span
                  class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out"
                  :class="{ '!w-full delay-500': !sidebarStore.isSidebarOpen }"
                ></span>
              </span>
              <span class="block absolute right-0 h-full w-full rotate-45">
                <span
                  class="absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out"
                  :class="{ '!h-0 delay-[0]': !sidebarStore.isSidebarOpen }"
                ></span>
                <span
                  class="delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out"
                  :class="{ '!h-0 delay-200': !sidebarStore.isSidebarOpen }"
                ></span>
              </span>
            </span>
          </button>
        </div>
        <div></div>

        <div class="flex items-center gap-4 2xsm:gap-10">
          <ul class="flex items-center gap-2 2xsm:gap-4">
            <li class="px-4">
              <ChangeLanguage />
            </li>
          </ul>
        </div>
      </div>
    </header> -->
    <header :class="{ 'nav-header': currentPage !== 'Home' }">
      <div class="flex flex-grow items-center justify-between py-2 px-4">
        <div class="flex items-center gap-2 sm:gap-4">
          <button
            class="block rounded-max hover:border-stroke hover:bg-gray-200 p-1.5 hover:shadow-sm focus:outline-none"
            :class="{ 'hover:bg-primary-800': currentPage !== 'Home' }"
            @click="
              () => {
                toggleSidebar()
              }
            "
            @keydown.esc="sidebarStore.isSidebarOpen = false"
          >
            <span class="relative block h-5.5 w-5.5 cursor-pointer">
              <span class="block absolute right-0 h-full w-full">
                <span
                  class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out"
                  :class="{
                    '!w-full delay-300': !sidebarStore.isSidebarOpen,
                    'bg-white': currentPage !== 'Home'
                  }"
                ></span>

                <span
                  class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out"
                  :class="{
                    '!w-full delay-400': !sidebarStore.isSidebarOpen,
                    'bg-white': currentPage !== 'Home'
                  }"
                ></span>
                <span
                  class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out"
                  :class="{
                    '!w-full delay-500': !sidebarStore.isSidebarOpen,
                    'bg-white': currentPage !== 'Home'
                  }"
                ></span>
              </span>
              <span class="block absolute right-0 h-full w-full rotate-45">
                <span
                  class="absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out"
                  :class="{ '!h-0 delay-[0]': !sidebarStore.isSidebarOpen }"
                ></span>
                <span
                  class="delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out"
                  :class="{ '!h-0 delay-200': !sidebarStore.isSidebarOpen }"
                ></span>
              </span>
            </span>
          </button>
        </div>
        <div class="flex items-center gap-4 2xsm:gap-10">
          <ul class="flex items-center gap-2 2xsm:gap-4">
            <li>
              <div>
                <SearchInput v-model="search" />
              </div>
            </li>
            <li class="px-4">
              <ChangeLanguage />
            </li>
          </ul>
        </div>
      </div>
    </header>
    <Navbar v-if="currentPage === 'Home'" />
  </div>
  <div v-if="userData && checkExport" ref="contentToExport" class="hidden-preview">
    <PreviewPage />
  </div>
</template>
<style>
.hidden-preview {
  position: absolute;
  left: -9999px;
}
</style>
