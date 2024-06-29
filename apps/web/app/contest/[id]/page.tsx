"use client"
import React, { useEffect, useState } from 'react'
import Codeditor from '../../../components/Codeditor'
import { Submit } from '../../functions/submit'
import Loader from '../../../components/Loader'
import { signIn, signOut, useSession } from 'next-auth/react'


const ContestRound = ({params}:{params:{id:string}}) => {
    // const file = fs.readFile("../../../../problems/add2numbers/boilerplate/function.js","utf-8",(err,file)=>console.log(err));
    const session = useSession();
    const userId = "shahzeb012";
    const [code, setCode] = useState<string>(localStorage?.getItem('userCode') || "");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");
    const [loading,setLoading] = useState(false);
    const [runagain,setRunagain] = useState(false);
    let retryCount = 1;
    const maxRetries = 2;

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

    const runAgainFx = async()=>{
      try {
        console.log("In run again function")
        await handleSubmit();
      } catch (error) {
        
        console.log(error);
      }
    }


    const handleSubmit = async()=>{
      setLoading(true);
        try {
            const Language = selectedLanguage.toLowerCase();
            const resp = await Submit({userId,selectedLanguage:Language,code});
            if(resp?.result.run.signal === "SIGKILL" && retryCount < maxRetries){
              retryCount++;
               await runAgainFx();
            }else if(retryCount >= maxRetries){
              alert("Try again after some time :( or try in different language")
              retryCount = 0;
               return ;
            }
            // alert(resp.message);
            console.log(resp);
        } catch (error) {
            alert(error);
        }finally{
          setLoading(false);
        }
    }

  return (
    <div className="">
         <div className="mb-4 text-center">
          <button onClick={()=>signIn()}>Sign in</button>
          {session && JSON.stringify(session.data)}
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
          <div className="bg-black text-white h-[3rem] w-[5rem] flex justify-center items-center rounded-md hover:scale-105 hover:bg-gray-800 transition cursor-pointer" onClick={handleSubmit}>{loading ? <Loader/>:"Submit"}</div>
        </div>
      </div>
    </div>
  )
}

export default ContestRound