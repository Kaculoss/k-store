import { Product } from "@/types"
import { create } from "zustand"

interface PreviewModalStore {
  isOpen: boolean
  data?: Product
  onOpen: (product: Product) => void
  onClose: () => void
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (product: Product) => set({ data: product, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default usePreviewModal
