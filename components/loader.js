'use client'
import React from "react"

const Loader = () => {
    return (
        <div className="h-screen w-screen bg-black">
            <div className="flex justify-center items-center h-full">
                <img className="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="" />
            </div>
        </div>
    )
}

export default Loader