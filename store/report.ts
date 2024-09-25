import { defineStore } from 'pinia'

interface ReportData {
  id: string
  email: string
}

export const useReportStore = defineStore('report', {
  state: () => ({
    showModal: false,
    data: null as ReportData | null
  }),
  actions: {
    async openModal(data: ReportData) {
      this.showModal = true
      if (data) {
        this.data = data
      } else {
        this.data = null
      }
    },
    async closeModal() {
      this.showModal = false
      this.data = null
    },
    async onModalUpdate(value: boolean) {
      this.showModal = value
    }
  }
})
