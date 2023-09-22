'use client'
import Nav from './components/header/header'
import React, { useState } from 'react'

export default function Home() {
  const [isNodeOpen, setIsNodeOpen] = useState(true);

  const handleNodeOpen = () => {
    setIsNodeOpen(!isNodeOpen);
  }

  return (
    <main className="flex min-h-screen flex-col items-end justify-between p-2"> 
      <button className='justify-end' onClick={handleNodeOpen}>Node</button>
      <div className={`fixed top-0 right-0 h-screen w-64 bg-gray-200 transition-transform duration-500 transform ${isNodeOpen ? 'translate-x-full' : '-translate-x-0' }`}>
        <Nav isNodeOpen={isNodeOpen} handleNodeOpen={handleNodeOpen}/>
      </div>
    </main>
  )
}
