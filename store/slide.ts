import { defineStore } from 'pinia'

export const useSlideStore = defineStore('slide', {
  state: () => ({
    showSlide: true
  }),
  actions: {
    async switchSlide() {
      this.showSlide = !this.showSlide
    }
  }
})
