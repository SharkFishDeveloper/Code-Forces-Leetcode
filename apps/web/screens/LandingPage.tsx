"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'


const LandingPage = () => {
  const { data: session } = useSession();
  return (
    <div><div>Landing page</div>
    <div>{JSON.stringify(session)}</div>
    <Link href={"/contest"}>Participate in Contest</Link>
    <Link href={"/problems"}>Solve problems</Link>
    
    </div>
  )
}

export default LandingPage