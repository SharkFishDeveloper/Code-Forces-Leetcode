"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Codeditor from '../../../components/Codeditor'
import { Submit } from '../../functions/submit'
import Loader from '../../../components/Loader'
import {  useSession } from 'next-auth/react'
import MarkdownProblem from '../../../components/MarkdownProblem'
import ShowTestCase from '../../../components/ShowTestCase'
import Timer from '../../../components/Timer'
import contestProblem from '../../functions/contestsubmit'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import axios from 'axios'
import FRONTEND_URL from '../../functions/frontendurl'

interface ContestData {
  user: string; // Assuming userId is a string
  contest: string; // Placeholder, adjust as per your actual data structure
  problemsSolved: number;
  time: string; // Placeholder, adjust as per your actual data structure
}


const ContestRound = ({params}:{params:{id:string}}) => {
  const router = useRouter();
  const [problemssolved,setProblemssolved] = useState(0);
  const [score,setScore] = useState(0);
  const { data: session } = useSession<Session|any>();
  

  let userId:string="";
//@ts-ignore
  if(session?.user?.id){
    //@ts-ignore
    userId = session?.user?.id;
    console.log(userId);
  }
  const [contestData,setContestdata] = useState<ContestData>({ 
    user: userId,
    contest: params.id, // Initialize with appropriate initial value
    problemsSolved: 0, // Initialize with appropriate initial value
    time: '',});
    
    const [code, setCode] = useState<string>(localStorage?.getItem('userCode') || "");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");
    const [loading,setLoading] = useState(false);
    const [runagain,setRunagain] = useState(false);
    let retryCount = 1;
    const maxRetries = 2;

    const [fullcode, setFullCode] = useState("");
    const [testcase, setTestcase] = useState("");
    const [output, setOutput] = useState("");
    const [showtestcase,setShowtestcase] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [cproblems,setcproblems] = useState<string[]|null>();

    const [boilerplate,setBoilerplate] = useState<string[]>();
    const [problemTitle,setproblemTitle] = useState<string>();
    const [problemScore,setproblemscore] = useState<{ problem: string; score: number }[]>([]);
    const [showMd,setShowmd] = useState<string|null>("");


    const [testcaseans,setTest_case_ans] = useState("");



    const addProblemScore = () => {

      const existingProblemIndex = problemScore.findIndex(item => item.problem === problemTitle);
      console.log("EXISTING ,",existingProblemIndex)
      //@ts-ignore
      if (existingProblemIndex !== -1) {
         //@ts-ignore
      if(problemScore[existingProblemIndex]){
         //@ts-ignore
      if (score > problemScore[existingProblemIndex].score) {
      setproblemscore(prev => {
        const updatedProblemScore = [...prev];
        updatedProblemScore[existingProblemIndex] = { problem: problemTitle as string, score: score };
        return updatedProblemScore;
      });
    }
  } 
        }
        else {
          console.log("RUNNING ELSE")
           setproblemscore(prev => [...prev, { problem: problemTitle as string, score: score }]);
        }
    };
    
  
  

    useEffect(()=>{
      console.log("useEffect triggered with problemssolved:", problemssolved);
      console.log("useEffect triggered with score:", score);
      if (score > 0) {
        addProblemScore();
      }
    },[problemssolved,score,])
    
    const [currentTimeLeft, setCurrentTimeLeft] = useState(0);

    const handleTimerTick = useCallback((timeLeft: number) => {
      setCurrentTimeLeft(timeLeft);
    }, []);
    

    useEffect(()=>{
      setLoading(true);
      const findMd = async()=>{
         try {
          const resp = await axios.post(`${FRONTEND_URL}/api/prob-description`,{slug:problemTitle});
          if(resp.status === 200){
            setShowmd(resp.data.message.description);
            setTest_case_ans(resp.data.message.test_cases_ans);
            setTestcase(resp.data.message.test_cases);
            console.log(resp.data.message.test_cases_ans);
          }
          else if(resp.status === 400){
            return alert("Something bad happened");
          }
         } catch (error) {
          console.log(error)
          // return alert("Someth sing bad happened");
         }finally{
          setLoading(false);
         }
      }
      findMd();
      console.log("I ran");
      console.log(selectedLanguage);
      
  },[problemTitle]);


    useEffect(() => {
      // Scroll to ref if showtestcase changes
      if (showtestcase && scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [showtestcase]);





    useEffect(() => {
      // Fetch problems from localStorage on component mount
      const getProblems = () => {
        const problems = localStorage.getItem('contest-problems');
        const score = localStorage.getItem('contest-score');
        setproblemscore(score && JSON.parse(score));
        if (problems) {
          setcproblems(JSON.parse(problems));
        }
        console.log("PROBLEMS",problems && JSON.parse(problems))
      };
      getProblems();
    }, []);
  



    useEffect(() => {
      // Fetch initial problem and set boilerplate on cproblems update
      if (cproblems && cproblems[0]) {
        const selectedProblemTitle = cproblems[0];
        setproblemTitle(selectedProblemTitle);
        fetchBoilerPlate({ title: selectedProblemTitle,language:selectedLanguage });
        // console.log(cproblems[0]);
      }
    }, [cproblems]);
  



    useEffect(() => {
      console.log("CHANGING LANGUAGE ",selectedLanguage,problemTitle);
      if (problemTitle) {
        fetchBoilerPlate({ title: problemTitle,language:selectedLanguage });
      }
    }, [selectedLanguage, problemTitle]);
    


    const fetchBoilerPlate = async ({title,language}:{title:string,language:string}) => {
      try {
          const language = selectedLanguage === "C++" ? "cpp" :
              selectedLanguage === "Java" ? "java" :
              selectedLanguage === "Python" ? "py" :
              selectedLanguage === "Javascript" ? "js" :
              selectedLanguage === "Rust" ? "rs" :
              "";
              const bpCode = await axios.post(`${FRONTEND_URL}/api/problems-boilerplate`,{slug:title,language:language});
              setCode(bpCode.data.message.boilerplateHalf);
              setFullCode(bpCode.data.message.boilerplateFull);
              // let test = JSON.parse(bpCode.data.message.test_cases);
              // setTestcase(test);
          console.log(bpCode)
      } catch (error) {
          alert("An error occurred");
      }
  }

    const runAgainFx = async () => {
        try {
            await handleSubmit();
        } catch (error) {
            console.log(error);
        }
    }


    

async function checkTestCases() {
      console.log(code)
      setShowtestcase(true);
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
             console.log(final_user_code)
        }
        setLoading(true);
        try {
            const Language = selectedLanguage.toLowerCase();
            const resp = await Submit({  selectedLanguage: Language, code: final_user_code });

            if(resp?.status===300){
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
              console.log(resp?.result.run.output)
              setOutput(resp?.result.run.output);
            }
             await checkTestCases();
        } catch (error) {
            // console.log("over")
            return alert(error);
        } finally {
            setLoading(false);
        }
    }


async function onFinishTimer (){
  if(!userId){
    return alert("Login first !!")
  }
  const contest = params.id;
  let solvedProblems = 0;
  let allproblems = cproblems?.length;
  let userproblemsScore = 0;
  const problems = problemScore.forEach((prob)=>{
    userproblemsScore+=prob.score;
    solvedProblems++;
  });
  const contestUserObj = {contest:contest,solvedProblems,allproblems,score:userproblemsScore,
    //@ts-ignore
    user:session? session?.user?.id:"",
    time:currentTimeLeft,username:session?.user?.name};

  try {
    await contestProblem(contestUserObj)
    alert("Thank you for participating")
    router.replace("/");
  } catch (error) {
    alert("Some issue with submitting")
  };


  return console.log("You clicked me",contestUserObj)
}


  console.log("problemTitle",problemTitle)
  console.log(problemssolved);

  return (
    <div className="">
         <div className=" text-center">
      Score - {score }

        <div className="text-lg font-bold flex justify-between p-3">
        <p className="font-bold text-2xl">Welcome to round - {params.id}</p>

        <div className="flex flex-col justify-star items-start">
        <span className="underline-offset-2 underline cursor-pointer hover:text-gray-700" onClick={()=>onFinishTimer()}>Submit test</span>
        {/* <span className="text-[0.5rem]">Click only when you are done</span> */}
        </div>
        </div>
        <div className="flex justify-center"><Timer  initialTime={7200} onFinish={() => onFinishTimer()}  onTick={handleTimerTick}/>
        </div>
        </div>
        <div className="flex ">
        {cproblems && cproblems.map((c,i)=>(
          <div key={i} className="h-[2.4rem] w-[6rem] bg-gray-800 text-white rounded-lg flex items-center justify-center ml-3 mb-1 text-sm hover:bg-gray-600 transition cursor-pointer " 
          onClick={()=>
           { setproblemTitle(c)
            fetchBoilerPlate({title:c,language:selectedLanguage})}
          }
          >
          {c && c.substring(0,1).toUpperCase()+c.substring(1,c.length)}
          </div>
        ))}

        </div>

        <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-[50%] h-[100%] bg-black">
            {problemTitle ? (
      <MarkdownProblem content={showMd as string} />
    ) : (
      <div className="text-center">Loading problem...</div>
    )}
            </div>
            
        
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="flex-1 mb-4 lg:mb-0">
        </div>
        <div className="flex-1 mb-2 space-y-2">
          <Codeditor code={code} setCode={setCode} setSelectedLanguage={setSelectedLanguage}/>
          <div className="bg-black text-white h-[2rem] w-[5rem] flex justify-center items-center rounded-md hover:scale-105 hover:bg-gray-800 transition cursor-pointer " onClick={handleSubmit}>{loading ? <Loader/>:"Submit"}</div>
        </div>
      </div>
    </div>
    {showtestcase && (
             //@ts-ignore
            <ShowTestCase output={output} testcaseans={testcaseans} testcase={testcase} problemName={params.id} type="CONTEST" />)}
    </div>
  )
}

export default ContestRound