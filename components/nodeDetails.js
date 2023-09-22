'use client'
import React, { useState } from 'react';

const NodeDetails = ({ isNodeOpen, handleNodeOpen, nodeData }) => {
    const [isOpen, setIsOpen] = useState(false);


    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='h-full bg-[#000]'>
            <div className='flex flex-row w-full bg-[#202123] h-5 justify-end items-center p-5 rounded-md'>
                <span className='bg-[#fff]'>{isNodeOpen}</span>
                <button onClick={handleNodeOpen}
                    className="flex flex-col cursor-pointer">
                    <span className={`bg-[#fff] block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm 'rotate-45 translate-y-1'`} >
                    </span>
                    <span className={`bg-[#fff] block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm'-rotate-45 -translate-y-1'`} >
                    </span>

                </button>
            </div>
            <div>
                {JSON.stringify(nodeData)}

            </div>
        </div>
    )
};

export default NodeDetails