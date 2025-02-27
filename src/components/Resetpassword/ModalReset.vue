<script setup="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
// cons account 

const checkUser = ()=>{

}
</script>
<template>
  <button
    type="button"
    data-dui-toggle="modal"
    data-dui-target="#exampleModalForm"
    class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-1 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition w-[20%]"
  >
    {{ t('check') }}
  </button>
  <div
    class="fixed antialiased inset-0 bg-stone-800 bg-opacity-75 flex justify-center items-center opacity-0 pointer-events-none transition-opacity duration-300 ease-out z-[9999]"
    id="exampleModalForm"
    aria-hidden="true"
  >
    <div
      class="bg-white rounded-lg w-9/12 sm:w-7/12 md:w-5/12 lg:w-3/12 scale-95 transition-transform duration-300 ease-out"
    >
      <div class="pt-4 px-4 flex justify-between items-start">
        <div class="flex flex-col">
          <h1 class="text-xl text-stone-800 font-semibold">{{ t('customer_information') }}</h1>
        </div>
        <button
          type="button"
          data-dui-dismiss="modal"
          aria-label="Close"
          class="text-stone-500 hover:text-stone-800"
        >
          &times;
        </button>
      </div>
      <div class="p-4">
        <div class="mb-4 mt-2 space-y-1.5">
          <label
            for="email"
            class="font-sans text-sm text-stone-800 dark:text-white font-semibold mb-2"
            >{{ t('branch_register') }}: <span class="text-red-500"> 010</span></label
          >
        </div>
        <div class="mb-4 mt-2 space-y-1.5">
          <label
            for="cif"
            class="font-sans text-sm text-stone-800 dark:text-white font-semibold mb-2"
            >CIF: <span  class="text-red-500"> 010277499</span></label
          >
        </div>
        <div class="mb-4 mt-2 space-y-1.5">
          <label
            for="fullName"
            class="font-sans text-sm text-stone-800 dark:text-white font-semibold mb-2"
            >{{ t('branch_in') }}: <span class="text-red-500">010</span></label
          >
        </div>
        <div class="mb-4 mt-2 space-y-1.5">
          <label
            for="fullName"
            class="font-sans text-sm text-stone-800 dark:text-white font-semibold mb-2"
            >{{ t('full_name') }}: <span class="text-red-500">Soukphasone Douangpanya</span></label
          >
        </div>
        <div class="mb-4 mt-2 space-y-1.5">
          <label
            for="fullName"
            class="font-sans text-sm text-stone-800 dark:text-white font-semibold mb-2"
            >{{ t('created_at') }}: <span class="text-red-500">12/13/2024 12:00:00 AM</span></label
          >
        </div>
        <div class="mb-4 mt-2 space-y-1.5">
          <label
            for="email"
            class="font-sans text-sm text-stone-800 dark:text-white font-semibold mb-2"
            >{{ t('email') }}: <span class="text-red-500">Soukphasone Douangpanya</span></label
          >
        </div>
        <div class="mb-4 mt-2 space-y-1.5">
          <label
            for="tel"
            class="font-sans text-sm text-stone-800 dark:text-white font-semibold mb-2"
            >{{ t('tel') }}: <span class="text-red-500">020 99110019</span></label
          >
        </div>
        <div class="mb-4 mt-2 space-y-1.5">
          <label
            for="customerType"
            class="font-sans text-sm text-stone-800 dark:text-white font-semibold mb-2"
            >{{ t('customer_type') }}: <span class="text-red-500">I</span></label
          >
        </div>
        <div class="mb-4 mt-2 space-y-1.5">
          <label
            for="uniqueId"
            class="font-sans text-sm text-stone-800 dark:text-white font-semibold mb-2"
            >{{ t('unique_id') }}: <span class="text-red-500">  11-0078490 </span></label
          >
        </div>
        <div class="mb-4 mt-2 space-y-1.5">
          <label
            for="password"
            class="font-sans text-sm text-stone-800 dark:text-white font-semibold mb-2"
            >{{ t('new_password') }}</label
          >
          <div class="relative w-full">
            <input
              placeholder="••••••••"
              type="password"
              class="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 dark:text-white placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
            />
          </div>
        </div>
        <div class="mb-4 mt-2 space-y-1.5">
          <label
            for="confirmPassword"
            class="font-sans text-sm text-stone-800 dark:text-white font-semibold mb-2"
            >{{t('confirm_password')}}</label
          >
          <div class="relative w-full">
            <input
              placeholder="••••••••"
              type="password"
              class="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 dark:text-white placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
            />
          </div>
        </div>
      </div>
      <div class="px-4 pb-4 flex flex-col justify-end gap-2">
        <button
          type="button"
          class="inline-flex w-full items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition"
        >
          Sign In
        </button>
      </div>
    </div>
  </div>
</template>
