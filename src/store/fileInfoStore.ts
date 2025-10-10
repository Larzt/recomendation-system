import { defineStore } from 'pinia'

export const useFileInfoStore = defineStore('file', {
  state: () => ({
    file: "",
  }),

  actions: {
    setFileInfo(data: string) {
      this.file = data;
    },
  },
})
