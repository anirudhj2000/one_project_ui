import React from "react";

const Sidebar = () => {
    return(
        <div className="w-2/12 h-full m-2 bg-[#483f69] rounded-md flex flex-row items-center">
           <div className="flex flex-col h-5/12 w-full items-center justify-around">
           <button type="button" class="text-white bg-[#503f8f] my-8 hover:bg-[#503f8fee] focus:ring-4 focus:outline-none focus:ring-[#7b6bb5] font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-[#bf5afa] dark:hover:bg-[#503f8fs] dark:focus:ring-[#7b6bb5]">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                    <span class="sr-only">Icon description</span>
                </button>
                <button type="button" class="text-white bg-[#503f8f] my-8 hover:bg-[#503f8fee] focus:ring-4 focus:outline-none focus:ring-[#7b6bb5] font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-[#bf5afa] dark:hover:bg-[#503f8fs] dark:focus:ring-[#7b6bb5]">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
                    </svg>
                    <span class="sr-only">Icon description</span>
                </button>
           </div>
        </div>
    )
}

export default Sidebar