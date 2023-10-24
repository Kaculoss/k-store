"use client"

import { useEffect, useState } from "react"

import { formatter } from "@/lib/utils"

const Currency = ({ value }: { value?: string | number }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return <div className="font-semibold">{formatter.format(Number(value))}</div>
}

export default Currency
