'use client'
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { GetPromptResult } from '@/service/promtsAPI';

const NodeDetails = ({ isNodeOpen, handleNodeOpen, nodeData, handleSubPromptData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subPrompt, setSubPrompt] = useState('');


    React.useEffect(() => {
       document.addEventListener('keydown', handleKeyPress);
    },[])
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            getSubPromptData()
        }
    }

    const getSubPromptData = () => {
        GetPromptResult(subPrompt).then( response => {
            handleSubPromptData(response);
        })
    }

    const onChangeSubPrompt = (event) => {
        setSubPrompt(event.target.value);
    }

    return (
        <div className='flex flex-col h-full bg-[#000] justify-between'>
            <div className='flex flex-row w-full bg-[#202123] justify-end items-center pt-5 pb-5 pr-2 self-start'>
                {/* s<div className='text-white text-bold'>{nodeData?.data.label || ''}</div> */}
                <button onClick={handleNodeOpen}
                    className="flex flex-col cursor-pointer text-white hover:bg-red-200 hover:text-black">
                    <CloseIcon />
                </button>
            </div>
            <div className='flex flex-grow overflow-auto text-white'>
                {nodeData?.data.label}
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
                    data-ripple-light="true" onClick={() => getSubPromptData()}
                >
                    <SendIcon />
                </button>
            </div>
        </div>
    )
};

export default NodeDetails