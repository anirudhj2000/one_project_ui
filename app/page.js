'use client'
import Image from 'next/image'
import Chat from '@/components/chatui'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter();
  React.useEffect(() => {
    router.push('/node')
  }, [])
  return (
    <main className="flex min-w-screen min-h-screen flex-col items-center justify-between bg-[#000]">
    </main>
  )
}