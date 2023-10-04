import React, { useEffect } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from "next/navigation";
import History from "../history";

const Feedback = () => {
    const router  = useRouter()

    useEffect(() => {
    },[])

    return(
        <div className="h-full w-full m-2 bg-[#483f69] rounded-md flex flex-row items-center hover:bg-[#483f69] overflow-hidden group">
           <div className="flex flex-col h-full w-full items-center justify-between py-4 px-4 hidden group-hover:block">
                <div className="text-[#fff] w-full">
                    <p>Email</p>
                    <input type="text" value={""} placeholder="email" onChange={() => {}} className="bg-[#e6e1f7] rounded-md w-full p-2 text-[#000]"/>
                </div>
                <div className="text-[#fff] w-full mt-2">
                    <p>Feedback</p>
                    <textarea placeholder="feedback..." className="h-[100px] bg-[#e6e1f7] rounded-md w-full p-2 text-[#000]">

                    </textarea>
                </div>
                <div className="w-full flex flex-row justify-end">
                <button 
                className="select-none rounded bg-[#000] py-[12px] rounded-0 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50"
                type="button"
                data-ripple-light="true"
            >
                Submit
            </button>
                </div>
           </div>
        </div>
    )
}

export default Feedback