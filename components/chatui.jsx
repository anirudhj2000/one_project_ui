import React from "react";

const Chat = ({title, text, onChange, onSubmit, onClear }) => {

    return (
        <div className="relative flex h-10 w-full">

            <input
                type="text"
                value={text}
                onChange={onChange}
                className="h-full w-full z-0 rounded-[4px] px-2 focus:border-0 text-[#fff] text-sm w-[500px] bg-[#ada0d9] placeholder:text-[#fff]"
                placeholder="Type here"
                required
            />


            <button onClick={onSubmit}
                className="!absolute right-0 top-0 z-10 select-none rounded bg-[#000] py-[12px] rounded-0 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50"
                type="button"
                data-ripple-light="true"
            >
                {title}
            </button>
        </div>
    )
}

export default Chat