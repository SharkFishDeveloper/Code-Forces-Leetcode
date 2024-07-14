"use client"
import Link from 'next/link';
import React from 'react';

interface Problem {
    level: string;
    score: string;
    title: string;
    path: string;
    date: Date | string;  // Allow for flexibility if dates are stored as strings initially
}

interface ContestProps {
    name: string;
    problems?: Problem[];
}


const ContestCard= ({ name, problems }:ContestProps) => {
    //@ts-ignore
    const date = new Date(problems[0]?.date);
    const formattedDate = date.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true // Display in 12-hour format
    });

    return (
        <div className="h-[13rem] max-w-sm rounded-xl overflow-hidden shadow-lg bg-white m-4 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer hover:bg-gray-100 flex flex-col justify-between">
            <div className="px-6 py-7">
                <div className="font-bold text-xl mb-2">Contest - {name}</div>
                <p className="text-gray-700 text-base">
                    Total Questions - {problems?.length}
                </p>
                <p className="text-gray-700 text-base">
                    Starts at - {formattedDate}
                </p>
            </div>
            <div className="flex items-center justify-center bg-black text-white h-[3rem] rounded-md hover:bg-gray-800 cursor-pointer" >
                <Link  href={`/contest/${name}`} onClick={()=>{
                    localStorage.setItem("contest-name",name);
                    if(problems)localStorage.setItem("contest-problems",JSON.stringify(problems));  
                }}>Participate</Link>
            </div>
        </div>
    
    );

}

export default ContestCard;
