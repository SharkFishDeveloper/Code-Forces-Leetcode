"use client"

import React, { useEffect, useState } from 'react'
import contest from "../../util/Contests.json";
import ContestCard from '../../components/ContestCard';
import axios from 'axios';
import FRONTEND_URL from '../functions/frontendurl';

// {
//   "name": "A1",
//   "problemsId": [
//     "add",
//     "binarysearch"
//   ],
//   "score": [
//     "100",
//     "350"
//   ],
//   "startTime": "2024-07-18T08:30:00.000Z"
// }

const Contest = () => {
  const [loading,setLoading] = useState(false);
  const [contest,setContest] = useState<{name:string,problemsId:string[],score:string[],startTime:string }[]| null>(null);

  useEffect(()=>{
    const fetchContest = async()=>{
      setLoading(true);
      const resp = await axios.get(`${FRONTEND_URL}/api/contest`);
      if(resp.status===200){
        setContest(resp.data.resp);
        //@ts-ignore
        const modContest = resp.data.resp.sort((a,b)=>{
          //@ts-ignore
          if(a.problems[0]?.date &&b.problems[0]?.date ){
        //@ts-ignore
            const dateA = new Date(a.problems[0].date).getTime();
            //@ts-ignore
            const dateB = new Date(b.problems[0].date).getTime();
            return dateA - dateB;
          }
        });
        setContest(modContest);
      }
      else{
        return alert(resp.data);
      }
      setLoading(false);
    }  
  fetchContest()
},[])
// console.log("CONTST DATA",contest, contest?.length,contest && contest[0]);

  //@ts-ignore


const formatDate = (dateStr:string) => {
  const dateObj = new Date(dateStr);
  return dateObj.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

// console.log(modContest)
const topContests = contest &&  contest.slice(0, 4);
  return (
      <div className="p-4 min-h-screen flex flex-col justify-center items-center">
          {!loading ? (
            <div className="max-w-10xl w-full">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-7">
                <div className="md:col-span-4">
                    <div className="flex justify-center">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {topContests &&  topContests?.map((c, index) => (
                              
                                <ContestCard key={index} name={c.name}  
                                problems={c.problemsId}
                                dateProblem={c.startTime}
                                score={c.score}
                                 />
                            ))}
                        </div> 
                    </div>
          
                </div>
                <div className="md:col-span-2 flex justify-end h-[32rem]">
                    <div className="bg-gray-900 overflow-y-auto text-white rounded-lg p-6 shadow-lg "  style={{ scrollbarWidth: 'none' }}>
                        <h2 className="text-2xl font-bold mb-4">More contests </h2>
        
                        <div className="bg-black mt-1 p-4 mb-1">
                            <p>Additional contests rounds for you</p>

                            <p>Click to show them</p>
                        </div>
                        {/* {contest && contest.map((c,index)=>(
                          <div key={index} className="bg-white text-black p-4 rounded-lg shadow-md flex items-center justify-between h-[3.8rem] mb-2">
                          <div>
                            <div>{JSON.stringify(contest)}</div>
                          </div>
                          <button className="bg-black text-white py-1 px-3 rounded-md hover:bg-gray-700">Show</button>
                        </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
          ):(
            <p>Loading ...</p>
          )}
      </div>
  
  )
}

export default Contest