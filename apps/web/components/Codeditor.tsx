"use client"
import CodeEditor from '@repo/ui/codeeditor'
import React, { useEffect, useState } from 'react'


interface CodeditorProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}
const Codeditor:React.FC<CodeditorProps>  = ({code,setCode}) => {
  const language_options = ["Java", "C", "C++", "Javascript", "Typescript", "Go", "Rust"];
  const [lang, setLang] = useState<string>("C++");
  const [box, setBox] = useState(false);
  const [mode, setMode] = useState("vs-dark");
  const [width,setWidth] = useState<string>("50vw");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "vs-dark" ? "light" : "vs-dark"));
  };

  const updateWidth = () => {
    if (window.innerWidth < 1024) {
      setWidth("100vw");
    } else {
      setWidth("50vw");
    }
  };

  useEffect(() => {
    updateWidth(); // Set initial width
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <div className={`relative p-4  text-black"}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-[8rem]">
          <div 
            onClick={() => setBox(prev => !prev)} 
            className={`h-[2.8rem] text-md rounded-md flex justify-center items-center cursor-pointer hover:bg-gray-300 ${mode === "vs-dark" ? "bg-black text-white hover:bg-gray-800" : "bg-gray-200 text-black hover:bg-gray-400"}`}
          >
            {lang}
          </div>
          {box && (
            <div className={`absolute top-[3rem] left-0 w-full rounded-md shadow-lg z-50 ${mode === "vs-dark" ? "bg-gray-900" : "bg-white"}`}>
              {language_options.map((option, index) => (
                <div 
                  className={`border-b flex justify-center items-center h-[2rem] cursor-pointer ${mode === "vs-dark" ? "border-gray-700 text-white hover:bg-gray-600" : "border-gray-200 text-black hover:bg-gray-300"}`} 
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
        <button 
          onClick={toggleMode} 
          className={`py-1 px-3 rounded-md ${mode === "vs-dark" ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-200 text-black hover:bg-gray-300"}`}
        >
          {mode === "vs-dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="mt-4">
        <CodeEditor lang={lang === "C++" ? "cpp" : lang.toLowerCase()} mode={mode} width={width} code={code} setCode={setCode}/>
      </div>
    </div>
  )
}

export default Codeditor
