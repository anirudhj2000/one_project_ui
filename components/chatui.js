import React from "react";

const Chat = ({ text, onChange, onSubmit, onClear }) => {

    return (
        <div className="relative flex h-10 w-800">

            <input
                type="text"
                value={text}
                onChange={onChange}
                className="h-full w-full z-0 rounded-[4px] px-2 border border-[#a6baae] text-[#fff] text-sm w-[500px] bg-[#81998a] placeholder:text-[#fff]"
                placeholder="Type here"
                required
            />


            <button onClick={onSubmit}
                className="!absolute right-1 top-1 z-10 select-none rounded bg-[#128059] py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                type="button"
                data-ripple-light="true"
            >
                Start
            </button>
        </div>
    )
}

export default Chat