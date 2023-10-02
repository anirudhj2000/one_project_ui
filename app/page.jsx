'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import StarLoader from '../components/starLoader';
import ReactFlow from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 300, y: 0 }, data: { label: 'How to be more productive' } },
  { id: '2', position: { x: 200, y: 100 }, data: { label: 'Take Frequent Breaks while studying' } },
  { id: '3', position: { x: 400, y: 100 }, data: { label: 'Manage your time efficiently' } },
  { id: '4', position: { x: 300, y: 200 }, data: { label: 'Create Schedule and try to stick to the schedule ' } },
  { id: '5', position: { x: 500, y: 200 }, data: { label: 'Avoid Multi-tasking' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' },{ id: 'e1-3', source: '1', target: '3' },{ id: 'e3-4', source: '3', target: '4' },{ id: 'e3-5', source: '3', target: '5' }];

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

  return (
    <main className="flex h-screen">
      <div className={`absolute w-screen h-screen absolute z-0`}>
        <StarLoader speed={5}/> 
      </div>
      <div style={{ width: '50vw', height: '50vh',position:'absolute',right:0,bottom:0}}>
        <ReactFlow nodes={initialNodes} edges={initialEdges}/>
      </div>
      <div className='z-10 w-full h-full flex flex-col p-8  bg-[#00000044x]'>
        <div className='w-9/12 m-3 p-4 rounded-2xl'>
          <h3 class="animate-charcter"> Change the way to you find GPT answers</h3>
        </div> 
        <div className='w-100 flex flex-col w-4/12 mx-8'>
          <button onClick={() => {router.push('/node')}} type="button" className="py-2 px-4 w-full flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="mr-2" viewBox="0 0 1792 1792">
              <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
            </svg>
            Sign in with GitHub
          </button>
          <button onClick={() => {router.push('/node')}}
              className="mt-2  bg-[#fff] px-4 py-2 border justify-center flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
              <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
              <span>Login with Google</span>
          </button>
        </div>
        
      </div>
    </main>
  )
}