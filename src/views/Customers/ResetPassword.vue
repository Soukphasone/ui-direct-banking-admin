<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ModalReset from '@/components/Resetpassword/ModalReset.vue'
</script>

<template>
  <DefaultLayout>
    <div class="flex flex-col items-center justify-center">
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center"
          >
            {{ t('reset_pass_customer') }}
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div class="flex mt-6 gap-x-4">
              <input
                type="cif"
                name="cif"
                id="cif"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[80%]"
                :placeholder="t('account_number')"
                required
              />
              <ModalReset />
            </div>
          </form>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
