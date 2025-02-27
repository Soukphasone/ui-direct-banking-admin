<script setup>
import useChangePassword from './ChangePassword'
const {
  isModalOpen,
  newPassword,
  oldPassword,
  confirmPassword,
  errorMessage,
  isShowEyeOldPass,
  isShowEyeNewPass,
  isShowEyeConPass,
  isLoading,
  handleShowEye,
  handleChangePass
} = useChangePassword()
</script>

<template>
  <div>
    <div v-if="isModalOpen" class="flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div class="flex justify-center">
            <p class="text-xl text-black">{{ $t('change_password') }}</p>
          </div>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleChangePass">
            <div>
              <label for="oldPassword" class="block mb-2 text-gray-900 dark:text-white">{{
                $t('old_password')
              }}</label>
              <div class="relative">
                <input
                  v-model="oldPassword"
                  :type="isShowEyeOldPass ? 'text' : 'password'"
                  name="oldPassword"
                  id="oldPassword"
                  placeholder="••••••••"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  type="button"
                  @click="handleShowEye('old-password')"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
                >
                  <img
                    v-if="isShowEyeOldPass"
                    src="@/assets/images/icon/hide_password.svg"
                    alt=""
                    class="w-8"
                  />
                  <img v-else src="@/assets/images/icon/show_password.svg" alt="" class="w-8" />
                </button>
              </div>
            </div>
            <div>
              <label for="newPassword" class="block mb-2 text-gray-900 dark:text-white">
                {{ $t('new_password') }}
              </label>
              <div class="relative">
                <input
                  v-model="newPassword"
                  :type="isShowEyeNewPass ? 'text' : 'password'"
                  name="newPassword"
                  id="newPassword"
                  placeholder="••••••••"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  type="button"
                  @click="handleShowEye('new-password')"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
                >
                  <img
                    v-if="isShowEyeNewPass"
                    src="@/assets/images/icon/hide_password.svg"
                    alt=""
                    class="w-8"
                  />
                  <img v-else src="@/assets/images/icon/show_password.svg" alt="" class="w-8" />
                </button>
              </div>
            </div>

            <div>
              <label for="confirmPassword" class="block mb-2 text-gray-900 dark:text-white">{{
                $t('confirm_password')
              }}</label>
              <div class="relative">
                <input
                  v-model="confirmPassword"
                  :type="isShowEyeConPass ? 'text' : 'password'"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  type="button"
                  @click="handleShowEye('confirm-password')"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
                >
                  <img
                    v-if="isShowEyeConPass"
                    src="@/assets/images/icon/hide_password.svg"
                    alt=""
                    class="w-8"
                  />
                  <img v-else src="@/assets/images/icon/show_password.svg" alt="" class="w-8" />
                </button>
              </div>
            </div>
            <div v-if="errorMessage" class="text-center text-red-600">
              {{ errorMessage }}
            </div>
            <button
              class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <span v-if="isLoading" class="flex flex-col justify-center items-center">
                <Loading size="20px" />
              </span>
              <span v-else>{{ $t('confirm') }}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
