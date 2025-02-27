import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOpenModalStore = defineStore('edit', () => {
  const isOpenModal = ref(false)
  function toggleEdit() {
    isOpenModal.value = !isOpenModal.value
  }

  return { isOpenModalEdit: isOpenModal, toggleEdit }
})
