<script setup>
import useLoginPage from './LoginPage'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Loading from '@/components/Loading/Loading.vue'
const { userName, passWord, checkError, errorMessage, isLoading, isShowEye, handleShowEye, handleLogin } =
  useLoginPage()
</script>

<template>
  <DefaultLayout>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 h-screen">
      <div class="w-full bg-white rounded-2xl shadow-lg md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div class="flex justify-center">
            <img src="@/assets/images/logo/LVB.png" alt="loginLogo" class="w-50" />
          </div>
          <form class="space-y-6" @submit.prevent="handleLogin">
            <div
              class="relative rounded-lg block py-2 px-2 w-full outline-none"
              :class="{
                'border border-primary': !userName,
                'border border-red-500': checkError && !userName,
                'border border-green-500': userName || !checkError
              }"
            >
              <div class="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7"
                  :class="{
                    'text-primary': !userName,
                    'text-red-500': checkError && !userName,
                    'text-black': userName || !checkError
                  }"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 7.5a3.75 3.75 0 11-7.5 0
                       3.75 3.75 0 017.5 0zM4.5 21a8.25 8.25 0 0115 0"
                  />
                </svg>
                <input
                  v-model="userName"
                  type="text"
                  :placeholder="$t('enter_name')"
                  class="text-gray-900 placeholder-gray-500 outline-none w-full"
                />
              </div>
            </div>
            <div
              class="relative rounded-lg block py-2 px-2 w-full outline-none"
              :class="{
                'border border-primary': !passWord,
                'border border-red-500': checkError && !passWord,
                'border border-green-500': passWord || !checkError
              }"
            >
              <div class="flex items-center gap-3">
                <svg
                  class="w-7 h-7"
                  :class="{
                    'text-primary': !passWord,
                    'text-red-500': checkError && !passWord,
                    'text-black': passWord || !checkError
                  }"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 11V8a4 4 0 10-8 0v3M7 11h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2z"
                  />
                  <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                </svg>
                <input
                  v-model="passWord"
                  :type="isShowEye ? 'text' : 'password'"
                  :placeholder="$t('enter_password')"
                  class="text-gray-900 placeholder-gray-500 outline-none w-full"
                />
                <button
                  v-if="passWord.length > 0"
                  type="button"
                  @click="handleShowEye('old-password')"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
                >
                  <span v-if="isShowEye">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6 text-gray-700"
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
                    <svg
                      viewBox="'0 0 24 24'"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 text-gray-700"
                    >
                      <path
                        d="M12 4C7 4 2.73 7.11 1 12c1.73 4.89 6 8 11 8s9.27-3.11 11-8c-1.73-4.89-6-8-11-8Zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6Zm0-10a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
                      />
                    </svg>
                  </span>
                </button>
              </div>

              <!-- <button
                  type="button"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 focus:outline-none"
                ></button> -->
            </div>
            <div v-if="errorMessage" class="text-center text-red-600">{{ errorMessage }}</div>
            <div>
              <button
                class="w-full text-white bg-primary hover:bg-primary-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
              >
                <span v-if="isLoading" class="flex flex-col justify-center items-center">
                  <Loading size="20px" />
                </span>
                <span v-else>{{ $t('login') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
