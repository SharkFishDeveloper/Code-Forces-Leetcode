"use client"
import React, { useState } from 'react';
import problems from "../../util/Problems.json";
import ProblemCard from '../../components/ProblemCard';
// import prisma from '../../../../packages/db/src';

const Problems = () => {
  const [visibleCount, setVisibleCount] = useState(8);

  const handleShowMore = () => {
    setVisibleCount(20);
  };

  return (
    <div className="min-h-screen w-full p-4 ">
      <h1 className="font-semibold text-3xl text-black mb-4 text-center">Popular Problems</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {problems.slice(0, visibleCount).map((problem, index) => (
          <ProblemCard 
            key={index} 
            title={problem.title} 
            path={problem.path} 
            level={problem.level}
            index={(index+1).toString()}
          />
        ))}
      </div>
      {visibleCount < problems.length && (
        <div className="flex justify-center mt-4">
          <button 
            onClick={handleShowMore} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Problems;
