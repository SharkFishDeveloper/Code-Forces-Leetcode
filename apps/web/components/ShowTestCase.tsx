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
//@ts-ignore
function deepEqual(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((el, idx) => deepEqual(el, b[idx]));
  }

  if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);

      if (keysA.length !== keysB.length) return false;
      return keysA.every(key => deepEqual(a[key], b[key]));
  }

  return a === b;
}



const ShowTestCase = ({ output,testcase, testcaseans, problemName,setProblemssolved, problemssolved,score,setScore,type }: TestcaseInterface) => {
  const [passedTestCase, setPassedTestCase] = useState(0);
  const [totalTestCase, setTotalTestCase] = useState(0);
  // const [errortestcase,setErrortestcase] = useState(0);
  // const [outputtestcase,setOutputtestcase] = useState<string|undefined>("");
  // const [correctOutput,setCorrectoutput] = useState<string|null>("");
  const session = useSession();
  const [status,setStatus] = useState("");
  const [finish,setFinish] = useState(false);


  if(!session){
    return alert("Please login")
  } 
  

  const testcasesOutputgiven = testcaseans.filter((line:any) => line.trim() !== '').map((line:any) => line.trim().replace(/\r/g, '')); 
  console.log("----------------------------")
  
  // console.log("original OOUtpout",output,typeof output);
  let yourOutput = output.split("\n").filter((line:any)=>line!=="");
  // console.log("givenOutput",testcasesOutputgiven);
  // console.log("youroutput",yourOutput);

  if(yourOutput.length > testcasesOutputgiven.length){
    const concatenatedString = yourOutput.join('');
    let b = concatenatedString.replace(/\]\[/g, "]\n[");
    yourOutput = b.split("\n");
  }

  function compareLines() {
    let passedCount = 0;
    setTotalTestCase(testcase.length);
     for (let index = 0; index < testcasesOutputgiven.length; index++) {
    const test = testcasesOutputgiven[index];
    const yourOutputValue = yourOutput[index];
    console.log("test",test,"yourOutput",yourOutputValue)
      console.log(`${index}`,test.replace(/\s+/g, ''),yourOutput[index].replace(/\s+/g, ''))
      try {

        const check = deepEqual(yourOutputValue.replace(/\s+/g, ''),test.replace(/\s+/g, ''));
        if(check){
          passedCount += 1;
          console.log("PASSED",yourOutput[index],test)
        }else{
          console.log("NOT PASSED",yourOutput[index],test)
          break;
        }
      } catch (error) {
        console.log(error)
      }
     
      setPassedTestCase(passedCount);

    };
  }

useEffect(() => {
    compareLines();
  }, [testcaseans]);


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
            <div className="bg-gray-800 p-4 rounded-md">{testcase[passedTestCase]}</div>
          </div>
          <div className="mb-4">
            <div className="font-bold">Correct Output:</div>
            <div className="bg-gray-800 p-4 rounded-md">{testcasesOutputgiven[passedTestCase]}</div>
          </div>
          <div className="mb-4">
            <div className="font-bold">Your Output:</div>
            <div className="bg-gray-800 p-4 rounded-md">{yourOutput[passedTestCase]}</div>
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
