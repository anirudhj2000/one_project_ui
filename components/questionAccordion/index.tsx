import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const QuestionAccordion = ({
  question,
  handleToggle,
  answer,
  open,
  onChangeAnswer,
}) => {
  return (
    <div className="flex flex-col w-full mb-2">
      {/* accordion header */}
      <a onClick={handleToggle} className="w-full">
        <div className="w-full flex flex-row items-center bg-[#ada0d9] p-3 rounded-md">
          <p className="text-[#fff] text-[0.75rem]">{question}</p>
          {open ? (
            <KeyboardArrowUpIcon sx={{ color: "#fff" }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ color: "#fff" }} />
          )}
        </div>
      </a>
      {open ? (
        <div
          className={`w-full h-0 flex flex-row items-center -mt-3 bg-[#ada0d9] p-3 rounded-md transition-all duration-600 ${
            open ? "h-[80px]" : "h-0"
          }`}
        >
          <textarea
            className="mt-1 p-2 w-full rounded-md text-[#000] bg-[#e6e1f7] text-[0.75rem]"
            onChange={onChangeAnswer}
            placeholder="Enter answer"
          >
            {answer}
          </textarea>
        </div>
      ) : null}
    </div>
  );
};

export default QuestionAccordion;
