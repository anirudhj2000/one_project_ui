'use client'
import React from "react";

const ComingSoon = () => {

    return (
        <div class="w-full h-screen bg-black">
            <div class="w-full h-screen flex flex-col items-center justify-between bg-black bg-opacity-70 py-8">
                <div class="flex-1 flex flex-col items-center justify-center">
                    <h1 class="text-6xl lg:text-7xl xl:text-8xl text-gray-200 tracking-wider font-bold font-serif mt-12 text-center">Coming Soon</h1>
                    <div class="flex flex-col items-center space-y-4 mt-24">
                        <p class="text-gray-300 uppercase text-sm">Ready to Elevate Your Experience? 🌟</p>
                        <form class="w-full flex items-center">
                            <input type="email" name="email" id="email" class="w-72 p-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded-tl rounded-bl text-sm" placeholder="Email" autocomplete="off" />
                            <button class="bg-blue-600 hover:bg-blue-700 py-2 px-6 text-gray-100 border border-blue-600 rounded-tr rounded-br text-sm">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComingSoon