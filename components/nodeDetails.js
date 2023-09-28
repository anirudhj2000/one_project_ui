'use client'
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { GetPromptResult,PostPrompt} from '@/service/promtsAPI';
import Chat from './chatui';
import axios from 'axios';

const NodeDetails = ({ isNodeOpen, handleNodeOpen, nodeData, handleSubPromptData,handleLoading }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subPrompt, setSubPrompt] = useState('');
    const [suggestions,setSuggestions] = useState([])
    const subPromptRef = React.useRef(subPrompt);

    const HandleSubPrompt = (event) => {
        setSubPrompt(event.target.value)
        subPromptRef.current = event.target.value
    }

    // React.useEffect(() => {
    //    document.addEventListener('keydown', handleKeyPress,true);
    // },[])


    // const handleKeyPress = (event) => {
    //     if (event.key === 'Enter' && isNodeOpen) {
    //         getSubPromptData()
            
    //     }
    // }'

    React.useEffect(() => {
        setSuggestions([])
    },[isNodeOpen])

    React.useEffect(() => {
        if(isNodeOpen)
        {
            axios.get(`https://mapmymind.computersforpeace.net/flows/suggestion?response_id=${nodeData.id || ''}`)
            .then((res) => {
                setSuggestions(res.data)
            })
        }
    },[isNodeOpen])

    const getSubPromptData = () => {
    console.log("asas",nodeData)
       let obj =  {
            response_id : nodeData.id,
            string : subPromptRef.current
        }

        console.log("asas",obj,nodeData)
        handleLoading()
        handleNodeOpen()
        PostPrompt(obj).then( response => {
            handleSubPromptData(response);
            setSubPrompt("")
            
        }).catch((err) => {
            console.log("err");
            handleLoading()
        })
    }

    return (
        <div className='flex flex-col h-full bg-[#483f69] justify-between rounded-md py-2 px-2'>
            <div className='flex flex-row w-full bg-[#483f69] justify-end items-center pt-3 pb-3 pr-2 self-start rounded-md'>
                {/* s<div className='text-white text-bold'>{nodeData?.data.label || ''}</div> */}
                <button onClick={handleNodeOpen}
                    className="flex flex-col cursor-pointer text-white hover:bg-red-200 hover:text-black">
                    <CloseIcon />
                </button>
            </div>
            <div className='flex flex-grow overflow-auto text-white'>
               <p className='px-2'>{nodeData?.data.label}</p>
            </div>
            <div className='flex flex-col p-4'>
                {
                    suggestions.map((item,index) => {
                        return(
                            <div key={index} className='w-full h-[48px] my-4'><p>{item}</p></div>
                        )
                    })
                }
            </div>
            <div className='mx-1'>
                <Chat title="Submit" text={subPrompt} onChange={HandleSubPrompt} onSubmit={() => getSubPromptData()} />
            </div>
            {/* <div className='flex flex-row h-10 relative'>
                <input
                    type="text"
                    value={subPrompt}
                    onChange={HandleSubPrompt}
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
            </div> */}
        </div>
    )
};

export default NodeDetails