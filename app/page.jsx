'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter();

  React.useEffect(() => {
    router.push('/node')
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-end justify-between p-2">
    </main>
  )
}