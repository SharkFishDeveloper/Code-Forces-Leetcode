import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FRONTEND_URL from '../app/functions/frontendurl';
import { useSession } from 'next-auth/react';

interface TestcaseInterface {
  output: any;
  testcase:any;
  testcaseans: any;
  setProblemssolved?:(n:number)=>void,
  problemssolved:number,
  score:number,
  problemName:string;
  setScore:(n:number)=>void;
  type:string
}

const ShowTestCase = ({ output,testcase, testcaseans, problemName,setProblemssolved, problemssolved,score,setScore,type }: TestcaseInterface) => {
  const [passedTestCase, setPassedTestCase] = useState(0);
  const [totalTestCase, setTotalTestCase] = useState(0);
  const [errortestcase,setErrortestcase] = useState<string|undefined>("");
  const [outputtestcase,setOutputtestcase] = useState<string|undefined>("");
  const [correctOutput,setCorrectoutput] = useState<string|null>("");
  const session = useSession();
  const [status,setStatus] = useState("");
  const [finish,setFinish] = useState(false);

  output = output.split(',[').join('\n[');
  testcaseans = testcaseans.replace(/\\/g, '').replace(/\[\[+/g, '[[').replace(/\]\]+/g, ']]').split(', ').join('\n').split(',[').join('\n[').replace(/\[\[/g, '[').replace(/\]\]/g, ']')

  if(!session){
    return alert("Please login")
  }

  useEffect(() => {
    function compareLines(input: any, test: any) {
     try {
        

        const filteredLinesInput = output.split('\n').filter((value, index, self) => self.indexOf(value) === index).filter(item => item.trim() !== '');

        const filteredLinesTest = testcaseans.split('\n');
        console.log("OUTPUT",filteredLinesInput);
        console.log("TESTCASE",filteredLinesTest);
        console.log("filteredLinesTest",filteredLinesTest.length);

        let passedCount = 0;
        setTotalTestCase(filteredLinesTest.length);


        for (let i = 0; i < filteredLinesTest.length; i++) {
          const lineInput = filteredLinesInput[i]?.trim().replace(/\s+/g, '').replace(/^\[|\]$/g, '').replace(/\[|\]/g, '');
          const lineTest = filteredLinesTest[i]?.trim().replace(/\s+/g, '').replace(/^\[|\]$/g, '').replace("[","").replace("]","");
          console.log(lineInput,lineTest);
          if (lineInput === lineTest) {
              passedCount++;
              setPassedTestCase(passedCount);
              setFinish(true);
            }else{
                // console.log(testcase[passedCount]);
                // setErrortestcase(lineTest);
                setErrortestcase(testcase[passedCount].toString())
                console.log("WRONG ouptut",lineInput);
                setOutputtestcase(lineInput);
                setCorrectoutput(lineTest);
                setFinish(true);
                return;
            }
        }
        
  
        

     } catch (error) {
        console.log(error);
        return alert("Try another problem");
     }
    }

    compareLines(output, testcaseans);
  }, [output, testcaseans]);


  useEffect(() => {

    if (setScore && setProblemssolved) {
      const percentPassed = Math.floor((passedTestCase / totalTestCase) * 100);
      if (percentPassed > 0) {
        //@ts-ignore
        setProblemssolved( problemssolved + 1); // Increment problemssolved by 1
        //@ts-ignore
        setScore( percentPassed); // Increment score based on percent passed
      }
    }
  },  [passedTestCase, totalTestCase, setProblemssolved, setScore]);

  const submitOnCorrect =async ()=>{
    var statusText="";
    if(passedTestCase===totalTestCase){
      setStatus("Accepted");
      statusText = "Accepted"
    }else if(passedTestCase.valueOf()!==totalTestCase.valueOf()){
      setStatus("WrongAnswer");
      statusText = "WrongAnswer"
    }else{
      setStatus("CompileError");
      statusText = "CompileError"

    }
    console.log("#########3",statusText)
   
   try {
    const resp = await axios.put(`${FRONTEND_URL}/api/submissions`,{
      //@ts-ignore
      userId : session.data?.user.id,
      status : statusText,
      problemName : problemName
    });
    console.log("Success",resp.data)
   } catch (error) {
    return alert("Some error in submission tab")
   }
 
  }
 useEffect(()=>{
   
  if (  type === "PROBLEM" && finish && passedTestCase===totalTestCase) {
    submitOnCorrect();
  }
 },[finish])

 console.log("--------->",status);
  return (
    <div className="flex items-center justify-center min-h-[50%] bg-white p-4 text-white">
  <div className="w-full max-w-4xl bg-black shadow-md rounded-md p-4 flex flex-col lg:flex-row">
    <div className="flex-grow lg:mr-8 mb-4 lg:mb-0">
      <div className="mb-4">
        <div className="font-bold">Time:</div>
        <div>{new Date().toLocaleString()}</div>
      </div>
      <div className="mb-4">
        <div className="font-bold">Status:</div>
        <div className={passedTestCase === totalTestCase ? "text-green-400" : "text-red-400"}>
          {passedTestCase === totalTestCase ? "Passed" : "Not Passed"}
        </div>
      </div>
      <div className="mb-4">
        <div className="font-bold">Problem:</div>
        <div> {problemName.substring(0,1).toUpperCase()+problemName.substring(1,problemName.length)}</div>
      </div>
      <div className="mb-4">
        <div className="font-bold">Total Submissions:</div>
        <div>totalSubmissions</div>
      </div>
      <div>
        <div className="font-bold">Pass Percentage:</div>
        <div>passPercentage%</div>
      </div>
    </div>

    <div className="flex-shrink-0 w-full lg:w-96 flex flex-col justify-center">
      {passedTestCase !== totalTestCase ? (
        <>
          <div className="mb-4">
            <div className="font-bold">Testcase:</div>
            <div className="bg-gray-800 p-4 rounded-md">{errortestcase}</div>
          </div>
          <div className="mb-4">
            <div className="font-bold">Correct Output:</div>
            <div className="bg-gray-800 p-4 rounded-md">{correctOutput}</div>
          </div>
          <div className="mb-4">
            <div className="font-bold">Your Output:</div>
            <div className="bg-gray-800 p-4 rounded-md">{outputtestcase}</div>
          </div>
        </>
      ) : (
        <div className="text-center text-green-400">All test cases are passed</div>
      )}
      <div className="flex items-center justify-center mt-4">
        <div className="font-bold mr-2" >{passedTestCase}/{totalTestCase} Test Cases Passed</div>
        {passedTestCase === totalTestCase  ? (
          <span className="text-green-400">✔️</span>
        ) : (
          <span className="text-red-400">❌</span>
        )}
      </div>
    </div>
  </div>
</div>
  );
};

export default ShowTestCase;
