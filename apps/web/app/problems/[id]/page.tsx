"use client"

import React, { useEffect, useRef, useState } from 'react';
import MarkdownProblem from '../../../components/MarkdownProblem';
import Codeditor from '../../../components/Codeditor';
import { Submit } from '../../functions/submit';
import Loader from '../../../components/Loader';
import ShowTestCase from '../../../components/ShowTestCase';
import Submissions from '../../../components/Submissions';
import axios from 'axios';
import FRONTEND_URL from '../../functions/frontendurl';


const Problem = ({ params }: { params: { id: string, title: string, path: string, level: string } }) => {
    let retryCount = 1;
    const maxRetries = 2;
    const [code, setCode] = useState<string>("");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");
    const [loading, setLoading] = useState(false);
    const [fullcode, setFullCode] = useState("");
    const [testcase, setTestcase] = useState("");
    const [testcaseans,setTest_case_ans] = useState("");
    const [output, setOutput] = useState("");
    const [showtestcase,setShowtestcase] = useState(false);
    const [showMd,setShowmd] = useState<string|null>("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const [submission,showSubmission] = useState(false);
    const [submitButton,showSubmitButton] = useState(true);

    useEffect(() => {
        if (showtestcase && scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showtestcase]);



    useEffect(()=>{
        setLoading(true);
        const findMd = async()=>{
           try {
            const resp = await axios.post(`${FRONTEND_URL}/api/problems`,{slug:params.id});
            console.log(resp);
            if(resp.status===200){
            console.log(resp.data.message.description);
            setShowmd(resp.data.message.description);
            setCode(resp.data.message.boilerplatehalfcode);
            setFullCode(resp.data.message.boilerplatefullcode);
            setTestcase(resp.data.message.test_cases);
            setTest_case_ans(resp.data.message.test_cases_ans);
            console.log("TESTCASES_ANSWERS=>",resp.data.message.test_cases_ans);
            }
            else if(resp.status===400){
                return alert("Something bad happened");
            }
           } catch (error) {
            console.log(error);
            return alert("Something bad happened");
           }finally{
            setLoading(false);
           }
        }
        findMd();
        
    },[selectedLanguage]);

     
    useEffect(()=>{
        setLoading(true);
        const fetchBoilerPlate = async () => {
            try {
                const language = selectedLanguage === "C++" ? "cpp" :
                    selectedLanguage === "Java" ? "java" :
                    selectedLanguage === "Python" ? "py" :
                    selectedLanguage === "Javascript" ? "js" :
                    selectedLanguage === "Rust" ? "rs" :
                    "";
                    if(language==="cpp"){
                        return ;
                    }
                    try {
                    const resp = await axios.post(`${FRONTEND_URL}/api/problems-boilerplate`,{slug:params.id,language:language});
                    setCode(resp.data.message.boilerplateHalf);
                    setFullCode(resp.data.message.boilerplateFull);
                    } catch (error) {
                    return alert("Error in fetching boilerlplate");
                    }
                    } catch (error) {
                        alert("An error occurred");
                    }
                    finally{
                        setLoading(false);
                    }
             }
             fetchBoilerPlate();
       },[selectedLanguage])

    
    
    const runAgainFx = async () => {
        try {
            // console.log("In run again function");
            await handleSubmit();
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async () => {
        setShowtestcase(false);
        let final_user_code="";
        if(selectedLanguage==="Java"){
            final_user_code = fullcode.replace("###USER_CODE_HERE", code);
            const importRegex = /^(?!\s*\/\/.*)(\s*import\s+[^\n;]+;)/gm;
            const imports = final_user_code.match(importRegex) || [];
            const importsText = imports.join('\n').trim();
            const finalCodeWithoutImports = final_user_code.replace(importRegex, '');
            final_user_code = `${importsText}${finalCodeWithoutImports}`
        }
        else{
             final_user_code = fullcode.replace("###USER_CODE_HERE", code);
        }
        console.log("final_user_code",final_user_code)
        setLoading(true);
        try {
            const Language = selectedLanguage.toLowerCase();
            const resp = await Submit({ selectedLanguage: Language, code: final_user_code });
            if(resp?.status===300 || resp?.status===429){
                return alert(resp.message)
            }
            if (resp?.result.run.signal === "SIGKILL" && retryCount < maxRetries) {
                retryCount++;
                await runAgainFx();
            } else if (retryCount >= maxRetries) {
                alert("Try again after some time :( or try in different language");
                retryCount = 0;
                return;
            } else if (resp?.result.run.output!==undefined) {
              setOutput(resp?.result.run.output);
            }
            //  await checkTestCases(resp?.result.run.output);
             await checkTestCases();
        } catch (error) {
            return alert(error);
        } finally {
            setLoading(false);
        }
    }

    async function checkTestCases() {

    //   compareStructuredData(testcaseans,outputs);
      setShowtestcase(true);
    }

//   function compareStructuredData(a:any,b:any){
//     const cleanedB = b 
//                      .replace(/,\s+/g, ',')
//                      .replace(/\[\s+/g, '[').replace(/\s+\]/g, ']')
//                      .replace(/'/g, '') 
//                      .replace(undefined, '')
//                      .replace(/"/g, ''); //! i added this , remove this in case of incorrect output
//     setOutput(cleanedB);
//     const cleanetest = testcaseans 
//                      .replace(/,\s+/g, ',')
//                      .replace(/\[\s+/g, '[').replace(/\s+\]/g, ']')
//                      .replace(/'/g, '') 
//                      .replace(/"/g, '');
//     setTest_case_ans(cleanetest);
//   } 



    return (
        <div>
            <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-[50%] h-[100%] bg-black">
                <MarkdownProblem content={showMd as string} />
            </div>
            <div className="w-full lg:w-[50%] mt-4 lg:mt-0 lg:ml-4">
            {loading && <p className="font-bold text-md">Loading ...</p> }
                { !submission ? (
                    <Codeditor code={code} setCode={setCode} setSelectedLanguage={setSelectedLanguage} />
                ):(
                    <p><Submissions problemName={params.id}  /></p>
                )}
                
                <div className="flex w-[14rem] h-[3rem]  rounded-md justify-center items-center space-x-3 text-sm ml-2">
                    {submitButton ?(
                        <div
                        className="bg-black text-white w-[6rem] h-[2rem] flex justify-center items-center rounded-md  hover:bg-gray-800 hover:scale-105 transition cursor-pointer mt-4 lg:mt-0"
                        onClick={handleSubmit}
                    >
                        {loading ? <Loader /> : "Submit"}
                    </div>
                    ):(
                        null
                    )}
                    <div className="bg-black w-[6rem] h-[2rem] text-white hover:bg-gray-800 rounded-md flex justify-center items-center hover:scale-105 transition cursor-pointer" onClick={()=>{
                        showSubmission(p=>!p);
                        showSubmitButton(p=>!p)
                    }}>Submissions</div>
                </div>
                <div ref={scrollRef}></div>

            </div>
        </div>

        {testcaseans && output && (
            <div>
                <p>TESTCASE - {testcase}</p>
                <p>GIVEN ANS - {testcaseans}</p>
                <p>OUTPUT - {output}</p>
            </div>
        )}
        {showtestcase && (
             //@ts-ignore
            <ShowTestCase output={output} testcaseans={testcaseans} testcase={testcase} problemName={params.id} type="PROBLEM" />)}
        </div>
    );
}

export default Problem;



    // useEffect(() => {
    //     const saveCode = () => {
    //         localStorage.setItem("userCode", code);
    //     }
    //     const interval = setInterval(() => {
    //         saveCode();
    //     }, 8000);
    //     return () => {
    //         clearInterval(interval); // Cleanup on unmount
    //     };
    // }, [selectedLanguage]);
