import React from "react";
import HistoryIcon from '@mui/icons-material/History';
import AddIcon from '@mui/icons-material/Add';

let list = ["how to be more productive", "how to cook", "how to get be less stressful"]

const History = () => {
    return(
        <div className="w-full h-full group">
            <div className="flex flex-row border-dashed border-1 border-[#fff] p-2 bg-[#ffffff12] rounded-md mb-6 h-[40px]">
                <AddIcon sx={{color:'#fff'}}/>
                <p className="mx-5 text-[#ffffff00] tranisition duration-200 w-0 group-hover:w-auto group-hover:text-[#fff] group-hover:mx-2">Start New</p>
            </div>
            <div className="">
                {
                    list.map((item) => {
                        return(
                            <a className="bg-[#ffffff12] flex flex-row items-center mb-2 h-[36px] px-2 rounded-md py-4">
                                <HistoryIcon sx={{color:'#ffffff88'}}/>
                                <p className="mx-5 text-[#ffffff00] tranisition duration-200 group-hover:text-[#fff] group-hover:mx-2">{item.slice(0,15)}...</p>
                            </a>
                        )
                    })  
                }
            </div>
        </div>
    )
}

export default History