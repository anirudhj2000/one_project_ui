'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

let words = ['Change the way to you find GPT Solutions', 'A structured way of apporaching solutions', 'Unlock your thinking'],part,
i = 0,
offset = 0,
len = words.length,
forwards = true,
skip_count = 0,
skip_delay = 15,
speed = 70;

export default function Home() {

  const router = useRouter();

  // React.useEffect(() => {
  //   router.push('/node')
  // }, [])

  return (
    <main className="flex h-screen">
      <div className='w-full h-full flex flex-col p-8  bg-[#000000]'>
        <div className='w-9/12 m-3 p-4 rounded-2xl'>
          <h3 class="animate-charcter"> Change the way to you find GPT answers</h3>
        </div> 
        <div className='w-100'>
          <a onClick={() => {router.push('/node')}}>
             <p className='text-[#fff]'>Login</p>
          </a>
        </div>
        
      </div>
    </main>
  )
}