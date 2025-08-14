"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'

const page = () => {
    const searchParams = useSearchParams();
    console.log("params",searchParams.get("q"))
  return (
    <div>page {searchParams}</div>
  )
}

export default page