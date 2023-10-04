import React from "react";
import HistoryIcon from '@mui/icons-material/History';
import AddIcon from '@mui/icons-material/Add';

let list = ["how to be more productive", "how to cook", "how to get be less stressful"]

const History = () => {
    return(
        <div className="w-full h-full group">
            <div className="flex flex-row border-dashed border-2 border-[#fff] p-2 bg-[#ffffff12] justify-start group-hover:justify-center rounded-md mb-2 h-[40px]">
                <AddIcon sx={{color:'#fff'}}/>
                <p className="mx-5 text-[#ffffff00] tranisition duration-200 hidden group-hover:block group-hover:text-[#fff] group-hover:mx-2">New flow</p>
            </div>
            <a className="bg-[#ffffff12] flex flex-row items-center mb-2 h-[36px] px-2 rounded-md py-4 group-hover:hidden">
                <HistoryIcon sx={{color:'#ffffff88'}}/>
            </a>
            <div className="hidden group-hover:block">
                {
                    list.map((item,index) => {
                        return(
                            <a key={index} className="bg-[#ffffff12] flex flex-row items-center mb-2 h-[36px] px-2 rounded-md py-4">
                                <HistoryIcon sx={{color:'#ffffff88'}}/>
                                <p className="mx-5 text-[#ffffff00] tranisition duration-200 group-hover:text-[#fff] text-[0.8rem] group-hover:mx-2 hidden group-hover:block">{ item.length > 15 ? item.slice(0,15) + '...' : item}</p>
                            </a>
                        )
                    })  
                }
            </div>
        </div>
    )
}

export default History