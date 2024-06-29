"use client"

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MarkdownProblem from '../../../components/MarkdownProblem';
import Codeditor from '../../../components/Codeditor';
import { Submit } from '../../functions/submit';
import Loader from '../../../components/Loader';
import { fetchBoilerPlateCode } from '../../functions/boilerplatecode';

const Problem = ({ params }: { params: { id: string, title: string, path: string, level: string } }) => {
    const searchParams = useSearchParams();
    let retryCount = 1;
    const maxRetries = 2;

    const path = searchParams.get('path');
    const [code, setCode] = useState<string>("");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");
    const [loading, setLoading] = useState(false);
    const [fullcode, setFullCode] = useState("");
    const [testcase, setTestcase] = useState("");
    const [output, setOutput] = useState("");

    useEffect(() => {
        const saveCode = () => {
            localStorage.setItem("userCode", code);
        }
        const interval = setInterval(() => {
            saveCode();
        }, 8000);

        fetchBoilerPlate();

        return () => {
            clearInterval(interval); // Cleanup on unmount
        };
    }, [selectedLanguage]);

    const runAgainFx = async () => {
        try {
            console.log("In run again function");
            await handleSubmit();
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async () => {
        const final_user_code = fullcode.replace("###USER_CODE_HERE", code);
        setLoading(true);
        try {
            const Language = selectedLanguage.toLowerCase();
            const resp = await Submit({ userId: "shahzeb012", selectedLanguage: Language, code: final_user_code });
            if (resp?.result.run.signal === "SIGKILL" && retryCount < maxRetries) {
                retryCount++;
                await runAgainFx();
            } else if (retryCount >= maxRetries) {
                alert("Try again after some time :( or try in different language");
                retryCount = 0;
                return;
            } else if (resp?.result.run.output!==undefined) {
              console.log("blkaf",resp?.result.run.output);
              setOutput(resp?.result.run.output);
            }
            else{
              alert("some error")
            }
            return await checkTestCases(resp?.result.run.output);
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    const fetchBoilerPlate = async () => {
        try {
            const language = selectedLanguage === "C++" ? "cpp" :
                selectedLanguage === "Java" ? "java" :
                selectedLanguage === "Python" ? "py" :
                selectedLanguage === "Javascript" ? "js" :
                selectedLanguage === "Rust" ? "rs" :
                "";
            const bpCode = await fetchBoilerPlateCode(`${path}/boilerplate/function.${language}` as string);
            setCode(bpCode.code);
            setFullCode(bpCode.fullcode);
            setTestcase(bpCode.test_case_code);
        } catch (error) {
            alert("An error occurred");
        }
    }

    async function checkTestCases(outputs:string) {
      const areEqual =compareStructuredData(testcase,outputs);
      console.log("Are test cases and output equal?", output);
  }

  function compareStructuredData(a:any,b:any){
    const cleanedB = b // Remove all spaces
                     .replace(/,\s+/g, ',') // Remove spaces after commas
                     .replace(/\[\s+/g, '[').replace(/\s+\]/g, ']')
                     .replace(/'/g, '')     // Remove single quotes
                     .replace(undefined, ''); 
    setOutput(cleanedB);

    console.log("O->",cleanedB);
//.replace(/"/g, '')
    setTestcase(a.replace(/"/g, ""));
    console.log("T->",a.replace(/"/g, "")) // Remove newlines
    // .replace(/ /g, '')  // Remove spaces
    // .replace(/'/g, '"'));
    // console.log("Testcase->",a.split("\n").join("").replace(/ /g,"").replace(undefined,"").replace(/['"]/g, ''));
    // const y =b.split("\n").join("").replace(/"/g, '').replace(/ /g, '');
    // return {};
  } 

    

    // console.log("These are real sol. of test cases =>");
    // console.log(testcase);
    // console.log("Actual outputs ->", output)

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-[50%] shadow-lg">
                <MarkdownProblem path={`${path}/Problem.md`} />
            </div>
            {/* <div>Output - {output}</div>
            <div>Real test cases - {testcase}</div> */}
            <div className="w-full lg:w-[50%] mt-4 lg:mt-0 lg:ml-4 shadow-lg">
                <div className="flex w-[14rem] h-[3rem]  rounded-md justify-center items-center space-x-3 text-sm ml-2">
                    <div
                        className="bg-black text-white w-[6rem] h-[2rem] flex justify-center items-center rounded-md  hover:bg-gray-800 hover:scale-105 transition cursor-pointer mt-4 lg:mt-0"
                        onClick={handleSubmit}
                    >
                        {loading ? <Loader /> : "Submit"}
                    </div>
                    <div className="bg-black w-[6rem] h-[2rem] text-white hover:bg-gray-800 rounded-md flex justify-center items-center hover:scale-105 transition cursor-pointer">Submissions</div>
                </div>
                <Codeditor code={code} setCode={setCode} setSelectedLanguage={setSelectedLanguage} />
            </div>
        </div>
    );
}

export default Problem;
