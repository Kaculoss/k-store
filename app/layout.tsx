import type { Metadata } from "next"
import { Urbanist } from "next/font/google"

import "./globals.css"

import { getCategories } from "@/lib/get-functions"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ModalProvider from "@/providers/modal-provider"
import { ToastProvider } from "@/providers/toast-provider"

const urbanist = Urbanist({ subsets: ["latin"] })

export const revalidate = 0

export const metadata: Metadata = {
  title: "K-Store",
  description: "K-Store",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories()

  return (
    <html lang="en">
      <body className={urbanist.className}>
        <ModalProvider />
        <ToastProvider />
        <Navbar categories={categories} />
        {children}
        <Footer />
      </body>
    </html>
  )
}
