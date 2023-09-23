'use client'
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const NodeDetails = ({ isNodeOpen, handleNodeOpen, nodeData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subPrompt, setSubPrompt] = useState('');


    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const onChangeSubPrompt = (event) => {
        setSubPrompt(event.target.value);
    }

    return (
        <div className='flex flex-col h-full bg-[#000] justify-between'>
            <div className='flex flex-row w-full bg-[#202123] h-5 justify-end items-center pt-5 pb-5 pr-2 self-start'>
                <div className=''></div>
                <button onClick={handleNodeOpen}
                    className="flex flex-col cursor-pointer">
                    <CloseIcon/>
                </button>
            </div>
            <div className='flex flex-grow overflow-auto'>
                {JSON.stringify(nodeData)}
            </div>
            <div className='flex flex-row h-10 relative'>
                <input
                type="text"
                value={subPrompt}
                onChange={onChangeSubPrompt}
                className="h-full w-full z-0 p-2 bg-[#626262] focus:ring-0"
                placeholder="Select Sub Prompt"
                required
            >
                
            </input>
            <button
                className="rounded-border-0 z-10 select-none rounded bg-[#128059] p-1 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                type="button"
                data-ripple-light="true"
            >
                <SendIcon/>
            </button>
            </div>
        </div>
    )
};

export default NodeDetails