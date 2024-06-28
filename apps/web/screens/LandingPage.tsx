import Link from 'next/link'
import React from 'react'


const LandingPage = () => {
  return (
    <div><div>Landing page</div>
    
    <Link href={"/contest"}>Participate in Contest</Link>
    <Link href={"/problems"}>Solve problems</Link>
    
    </div>
  )
}

export default LandingPage