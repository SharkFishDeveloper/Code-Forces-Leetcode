
import Link from 'next/link';
import React from 'react'



const Contest = () => {
  const contests = [
    {id:"12",cname:"Round1"}
  ];

  return (
    <div>
        <div className="">
       {contests && contests.map((c,index)=> (
        <div key={index}>

          <Link href={`contest/${c.id}`}>{c.cname}</Link>
        </div>
       ))}
       </div>
        
        CLick on anyone to join
        
        </div>
  )
}

export default Contest