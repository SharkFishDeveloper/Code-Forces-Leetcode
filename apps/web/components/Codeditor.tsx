"use client"
import CodeEditor from '@repo/ui/codeeditor'
import React, { useState } from 'react'

const Codeditor = () => {
  const language_options = ["Java", "C", "C++", "Javascript", "Typescript", "Go", "Rust"];
  const [lang, setLang] = useState<string>("C++");
  const [box, setBox] = useState(false);

  return (
    <div className="relative p-4">
      <div className="relative w-[8rem]">
        <div 
          onClick={() => setBox(prev => !prev)} 
          className="bg-black text-white h-[2.8rem] text-md rounded-md flex justify-center items-center cursor-pointer hover:bg-gray-800"
        >
          {lang}
        </div>
        {box && (
          <div className="absolute top-[3rem] left-0 w-full bg-gray-900 rounded-md shadow-lg z-50">
            {language_options.map((option, index) => (
              <div 
                className="border-b border-gray-700 text-white flex justify-center items-center h-[2rem] hover:bg-gray-600 cursor-pointer" 
                key={index} 
                onClick={() => {
                  setLang(option);
                  setBox(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4">
        <CodeEditor lang={lang === "C++" ? "cpp" : lang.toLowerCase()} />
      </div>
    </div>
  )
}

export default Codeditor
