import { Product } from "@/types"
import toast from "react-hot-toast"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface CartStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  removeAll: () => void
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (product: Product) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id === product.id)

        if (existingItem) return toast("Item already in cart.")

        set({ items: [...currentItems, product] })
        toast.success("Itm added to cart.")
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] })
        toast.success("Item removed from cart.")
      },
      removeAll: () => set({ items: [] }),
    }),
    { name: "cart-storage", storage: createJSONStorage(() => localStorage) }
  )
)

export default useCart
