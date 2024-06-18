"use client"
import React, { useEffect, useState } from 'react'
import Codeditor from '../../../components/Codeditor'
import axios from 'axios'
import { Submit } from '../../functions/submit'


const ContestRound = ({params}:{params:{id:string}}) => {
    const [code, setCode] = useState<string>(localStorage.getItem('userCode') || "");
    const userId = "shahzeb012";
    const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");


    useEffect(()=>{
        const saveCode = ()=>{
            localStorage.setItem("userCode",code);
        }
        const interval = setInterval(()=>{
            saveCode();
        },8000)
        return () => {
            clearInterval(interval); // Cleanup on unmount
          };
    },[code]);

    const handleSubmit = async()=>{
        try {
            // const resp = await axios.post(`/api/submit_test`,{userId,code,selectedLanguage}) ;
            // alert("Pushed in redis");
            // console.log("Pused consolet")
            const resp = await Submit({userId,selectedLanguage,code});
            alert(resp);
            console.log(resp);
        } catch (error) {
            alert(error);
        }
    }

  return (
    <div className="">
         <div className="mb-4 text-center">
        <div className="text-lg font-bold">Contest Round</div>
        <p className="font-bold text-2xl">Welcome to round - {params.id}</p>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="flex-1 mb-4 lg:mb-0">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="font-semibold">Question</div>
            <p className="mb-2">WAP to add 2 numbers</p>
            <div className="font-semibold">Input</div>
            <p className="mb-2">2 3</p>
            <div className="font-semibold">Output</div>
            <p className="">5</p>
          </div>
          <p>Selected Language: {selectedLanguage}</p>
        <p>{JSON.stringify(code) }</p>
        </div>
        <div className="flex-1">
          <Codeditor code={code} setCode={setCode} setSelectedLanguage={setSelectedLanguage}/>
          <div className="bg-black text-white h-[3rem] w-[5rem] flex justify-center items-center rounded-md hover:scale-105 hover:bg-gray-800 transition cursor-pointer" onClick={handleSubmit}>Submit</div>
        </div>
      </div>
    </div>
  )
}

export default ContestRound