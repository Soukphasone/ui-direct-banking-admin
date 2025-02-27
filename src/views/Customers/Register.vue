<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import DefaultLayout from '@/layouts/DefaultLayout.vue'
const branches = ref([
  { id: 1, name: 'LAO VIET BANK - HO BRANCH' },
  { id: 2, name: 'UODOMXAY BANKING UNIT' },  
  { id: 3, name: 'LAO VIET BANK - CHAMPASACK BRANCH'},
  { id: 4, name: 'LAOVIETBANK SENO Service Unit'},
  { id: 5, name: 'LAO VIET BANK - SAVANAKHET BRANCH' },
  { id: 6, name: 'LAO VIET BANK - ATAPEU BRANCH'},
  { id: 7, name: 'LAO VIET BANK - XIENG KHOANG BRANCH'},
  { id: 7, name: 'LAO VIET BANK - LUANGPRABANG BRANCH'},
  { id: 8, name: 'KHAMMOUAN BANKING UNIT'},
  { id: 9, name: 'MORNING MAKET UNIT'},
  { id: 10, name: 'SALAKHAM BANKING UNIT'},
  { id: 11, name: 'Lao Viet Joint Venture - Naxay'},
  { id: 12, name: 'LAOVIET BANK NO.1 Transaction Unit'},
  { id: 13, name: 'SYKHAY SERVICES UNIT'},
  { id: 14, name: 'DONGDOK SERVICES UNIT'},
  { id: 15, name: 'LAO VIET BANK, DONNOUN SERVICES UNIT'},
  { id: 16, name: 'LAO VIET BANK TRANSACTION DEPT KM8'},
  { id: 17, name: 'LAO VIET BANK, ITECC Services Unit'},
  { id: 18, name: 'LAOVIETBANK DUANGDY TRN UNIT'},
  { id: 19, name: 'LAOVIET BANK KAYSONE TRN UNIT'},
  { id: 20, name: 'LAOVIET BANK DENSAVANH TRN UNIT'},
  { id: 21, name: 'LAOVIET BANK PHONSAVANH TRN UNIT'},
  { id: 22, name: 'LAOVIET BANK, WATTAY UNIT'},
  { id: 23, name: 'LAO VIET BANK BOLIKHAMXAY UNIT'},
  { id: 24, name: 'Lao-Viet Bank., LTD, Nongbok Transa'},
])
</script>

<template>
  <DefaultLayout>
    <div class="flex flex-col items-center justify-center bg-gray-100">
      <div
        class="w-full bg-white rounded-2xl shadow-lg"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl leading-tight tracking-tight text-gray-900 md:text-2xl text-center"
          >
            {{ t('customer_information') }}
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                for="branch_register"
                class="block mb-2 text-sm font-medium text-gray-900"
                >{{ t('branch_register') }}</label
              >
              <select
                id="branch_register"
                name="branch_register"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-black block w-full p-2.5"
                required
              >
                <option value="">{{ t('select_branch') }}</option>
                <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                  {{ branch.name }}
                </option>
              </select>
              
            </div>
            <div>
              <label for="cif" class="block mb-2 text-sm font-medium text-gray-900"
                >CIF</label
              >
              <input
                type="text"
                name="cif"
                id="cif"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                :placeholder="t('enter_cif')"
                required
              />
            </div>
            <div class="text-lg mb-2 text-center text-black">
              {{ t('branch_in') }}
            </div>
            <div>
              <label
                for="full_name"
                class="block mb-2 text-sm font-medium text-gray-900"
                >{{ t('full_name') }}</label
              >
              <input
                type="text"
                name="full_name"
                id="full_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                :placeholder="$t('enter_full_name')"
                required
              />
            </div>
            <div>
              <label
                for="cif"
                class="block mb-2 text-sm font-medium text-gray-900"
                >{{ t('email') }}</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                :placeholder="t('enter_email')"
                required
              />
            </div>
            <div>
              <label
                for="cif"
                class="block mb-2 text-sm font-medium text-gray-900"
                >{{ t('tel') }}</label
              >
              <input
                type="text"
                name="tel"
                id="tel"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                :placeholder="t('enter_tel')"
                required
              />
            </div>
            <div class="text-lg mb-2 text-center text-black">
              {{ t('login_information') }}
            </div>
            <div>
              <label
                for="user_name"
                class="block mb-2 text-sm font-medium text-gray-900"
                >{{ t('user_name') }}</label
              >
              <input
                type="text"
                name="user_name"
                id="user_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                :placeholder="t('enter_name')"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
                >{{ t('password') }}</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                for="confirm_password"
                class="block mb-2 text-sm font-medium text-gray-900"
                >{{ t('confirm_password') }}</label
              >
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div class="flex mt-6 gap-x-4">
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {{ t('register') }}
              </button>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {{ t('cancel') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
