import { Billboard, Category, Color, Product, Query, Size } from "@/types"
import qs from "query-string"

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
  return res.json()
}

export const getCategory = async (id: string): Promise<Category> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`)
  return res.json()
}

export const getBillboard = async (id: string): Promise<Billboard> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/billboards/${id}`)
  return res.json()
}

export const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_URL}/products`,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  })
  const res = await fetch(url)
  return res.json()
}

export const getProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
  return res.json()
}

export const getSizes = async (): Promise<Color[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sizes`)
  return res.json()
}

export const getColors = async (): Promise<Size[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/colors`)
  return res.json()
}
