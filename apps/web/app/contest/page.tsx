"use client"
import Link from 'next/link';
import React, { useCallback, useState } from 'react'
import contest from "../../util/Contests.json";
import ContestCard from '../../components/ContestCard';
import Timer from '../../components/Timer';


const Contest = () => {
const modContest = contest.sort((a,b)=>{
  if(a.problems[0]?.date &&b.problems[0]?.date ){

    const dateA = new Date(a.problems[0].date).getTime();
    const dateB = new Date(b.problems[0].date).getTime();
    return dateA - dateB;
  }
});

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

console.log(modContest)
const topContests = modContest.slice(0, 4);
  return (
      <div className="p-4 min-h-screen flex flex-col justify-center items-center">
          <div className="max-w-10xl w-full">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-7">
                  <div className="md:col-span-4">
                      <div className="flex justify-center">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {topContests && topContests.map((c, index) => (
                                  <ContestCard key={index} name={c.contest} problems={c.problems} />
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
                          {contest && contest.map((c,index)=>(
                            <div key={index} className="bg-white text-black p-4 rounded-lg shadow-md flex items-center justify-between h-[3.8rem] mb-2">
                            <div>
                              <div className="font-semibold text-lg">Contest - {c.contest}</div>
                              <div className="text-gray-500 text-sm">{c.problems[0] && 
                                formatDate(c.problems[0]?.date)}</div>
                            </div>
                            <button className="bg-black text-white py-1 px-3 rounded-md hover:bg-gray-700">Show</button>
                          </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
          {/* <div className="mt-4 text-center">
              Click on anyone to join
          </div> */}
      </div>
  
  )
}

export default Contest