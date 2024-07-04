import React, { useEffect, useState } from 'react';

interface TestcaseInterface {
  output: string;
  testcase: string;
  setProblemssolved?:(n:number)=>void,
  problemssolved:number,
  score:number,
  setScore:(n:number)=>void
}

const ShowTestCase = ({ output, testcase, setProblemssolved, problemssolved,score,setScore }: TestcaseInterface) => {
  const [passedTestCase, setPassedTestCase] = useState(0);
  const [totalTestCase, setTotalTestCase] = useState(0);
  const [errortestcase,setErrortestcase] = useState<string|undefined>("");
  const [outputtestcase,setOutputtestcase] = useState<string|undefined>("");

    console.log("Output",output);
    console.log("TEstCAse",testcase);

  useEffect(() => {
    function compareLines(input: any, test: any) {
     try {
        // const linesInput = String(input).split('\n');
        // const linesTest = String(test).split('\n');

        let linesInput = String(input).replace(/\r/g, '').split('\n');
        let linesTest = String(test).replace(/\r/g, '').split('\n');

        const filteredLinesInput = linesInput.filter(line => line.trim() !== '');
        const filteredLinesTest = linesTest.filter(line => line.trim() !== '');

        console.log("testcase length",testcase.length);
        console.log("filteredLinesTest",filteredLinesTest.length);
        // linesInput = String(input).split('\n');
        //  linesTest = String(test).split('\n');

        let passedCount = 0;
        setTotalTestCase(filteredLinesTest.length);
        for (let i = 0; i < filteredLinesTest.length; i++) {
          const lineInput = filteredLinesInput[i]?.trim().replace(/\s+/g, '');
          const lineTest = filteredLinesTest[i]?.trim().replace(/\s+/g, '');
          
          if (lineInput === lineTest) {
              passedCount++;
              setPassedTestCase(passedCount);
            }else{
                setErrortestcase(lineTest);
                setOutputtestcase(lineInput);
                return;
            }
        }
        
  
        

     } catch (error) {
        console.log(error);
        return alert("Try another problem");
     }
    }

    compareLines(output, testcase);
  }, [output, testcase]);


  useEffect(() => {
    // if (passedTestCase === totalTestCase && setProblemssolved) {
    //   setProblemssolved(problemssolved + 1); // Increment problemssolved by 1
    // }
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
        <div>problemName</div>
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
            <div className="font-bold">Correct Output:</div>
            <div className="bg-gray-800 p-4 rounded-md">{errortestcase}</div>
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
        <div className="font-bold mr-2">{passedTestCase}/{totalTestCase} Test Cases Passed</div>
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
