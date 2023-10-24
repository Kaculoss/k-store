"use client"

import { MouseEventHandler } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Product } from "@/types"
import { Expand, ShoppingCart } from "lucide-react"

import useCart from "@/hooks/use-cart"
import usePreviewModal from "@/hooks/use-preview-modal"
import IconButton from "@/components/ui/icon-button"

import Currency from "./currency"

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const previewModal = usePreviewModal()
  const cart = useCart()
  const router = useRouter()

  const handleClick = () => {
    router.push(`/product/${product?.id}`)
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    previewModal.onOpen(product)
  }

  const addToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    cart.addItem(product)
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={product?.images?.[0]?.url}
          fill
          alt={product.name}
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={addToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold text-lg">{product.name}</p>
        <p className="text-gray-500 text-sm">{product.category.name}</p>
      </div>
      <div className="flex items-center justify-between">
        <Currency value={product.price} />
      </div>
    </div>
  )
}

export default ProductCard
