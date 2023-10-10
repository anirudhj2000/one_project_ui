"use client";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { GetPromptResult, PostPrompt } from "@/service/promtsAPI";
import QuestionAccordion from "./questionAccordion";
import Chat from "./chatui";
import axios from "axios";
import { list } from "postcss";

let promptString = "{{#system~}}You are a helpful and terse system{{~/system}}";

const NodeDetails = ({
  isNodeOpen,
  handleNodeOpen,
  nodeData,
  handleSubPromptData,
  handleLoading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subPrompt, setSubPrompt] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const subPromptRef = React.useRef(subPrompt);

  const HandleSubPrompt = (event) => {
    setSubPrompt(event.target.value);
    subPromptRef.current = event.target.value;
  };

  // React.useEffect(() => {
  //    document.addEventListener('keydown', handleKeyPress,true);
  // },[])
  // const handleKeyPress = (event) => {
  //     if (event.key === 'Enter' && isNodeOpen) {
  //         getSubPromptData()

  //     }
  // }

  React.useEffect(() => {
    setSuggestions([]);
  }, [isNodeOpen]);

  React.useEffect(() => {
    if (isNodeOpen) {
      axios
        .get(
          `https://mapmymind.computersforpeace.net/flows/suggestion?response_id=${
            nodeData.id || ""
          }`
        )
        .then((res) => {
          let list = [];
          res.data.map((item) => {
            let obj = {
              question: item,
              answer: "",
              show : false,
            };
            list.push(obj);
          });
          setSuggestions(list);
        });
    }
  }, [isNodeOpen]);

  const HandleAccordionToggle = (index) => {
    let list = [...suggestions]
    list[index].show = !list[index].show;
    setSuggestions(list)
  }

  const getSubPromptData = () => {
    console.log("asas", nodeData);

    let promptStr = promptString;
    suggestions.map((item) => {
      if (item.answer.length > 0) {
        promptStr += "{{#assistant~}}" + item.question + "{{~/assistant}}";
        promptStr += "{{#user~}}" + item.answer + "{{~/user}}";
      }
    });

    promptStr +=
      // "{{#assistant~}}" + "Can you provide some additional context ?" + "{{~/assistant}}";
    promptStr += "{{#user~}}" + subPromptRef.current + "{{~/user}}";

    let obj = {
      response_id: nodeData.id,
      string: promptStr,
    };

    console.log("asas", obj, nodeData);
    handleLoading();
    handleNodeOpen();
    PostPrompt(obj)
      .then((response) => {
        handleSubPromptData(response);
        setSubPrompt("");
      })
      .catch((err) => {
        console.log("err");
        handleLoading();
      });
  };

  return (
    <div className="flex flex-col h-full bg-[#483f69] justify-between rounded-md py-2 px-2">
      <div className="">
        <div className="flex flex-row w-full bg-[#483f69] justify-end items-center pt-1 pb-1 pr-2 self-start rounded-md">
          {/* s<div className='text-white text-bold'>{nodeData?.data.label || ''}</div> */}
          <button
            onClick={handleNodeOpen}
            className="flex flex-col h-[16px] w-[16px] cursor-pointer text-white hover:bg-red-200 hover:text-black"
          >
            <CloseIcon style={{ height: "16px", width: "16px" }} />
          </button>
        </div>
        <div className="flex text-white mt-2">
          <p className="px-2">{nodeData?.data.label}</p>
        </div>
      </div>

      <div className="">
        <div className="flex flex-col p-2 overflow-scroll">
         {suggestions.length>0 && <p className="text-[0.7rem] text-[#fff] my-1">Additional Questions...</p>}
          {suggestions.map((item, index) => {
            return (
              <QuestionAccordion 
                key={index}
                question={item.question} 
                answer={item.answer} 
                onChangeAnswer={() => {let list = [...suggestions];
                list[index].answer = e.target.value;
                setSuggestions(list);}} 
                handleToggle={() => {HandleAccordionToggle(index)}} 
                open={item.show}/>
            );
          })}
        </div>
        <div className="mx-1 bottom-0">
          <Chat
            title="Submit"
            text={subPrompt}
            onChange={HandleSubPrompt}
            onSubmit={() => getSubPromptData()}
          />
        </div>
      </div>
    </div>
  );
};

export default NodeDetails;