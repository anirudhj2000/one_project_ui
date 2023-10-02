import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from "next/navigation";
import History from "../history";

const Sidebar = () => {
    const router  = useRouter()
    return(
        <div className="h-full m-2 bg-[#483f69] rounded-md flex flex-row items-center hover:bg-[#483f69] group">
           <div className="flex flex-col h-full w-full items-center justify-between py-4 px-2">
                <div className="w-full h-6/12 overflow-hidden">
                    <div className="w-full ">
                    <History/>
                    </div>
                </div>
                <a onClick={() => {router.push('/')}} className="flex flex-row w-full items-center group-hover:justify-center rounded-md overflow-hidden p-2 bg-[#ffffff33]">
                    <LogoutIcon color="error"/>
                    <div className="transition-all mx-2 group-hover:mx-3">
                        <p className="text-[0.8rem] text-[#ffffff00] group-hover:text-[#fff]">Logout</p>
                    </div>
                </a>
           </div>
        </div>
    )
}

export default Sidebar