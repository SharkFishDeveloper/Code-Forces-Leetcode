"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import MarkdownProblem from '../../../components/MarkdownProblem'


const Problem = ({params}:{params:{id:string,title:string,path:string,level:string}}) => {
    const searchParams = useSearchParams()
    const title = searchParams.get('title')
    const level = searchParams.get('level')
    const path = searchParams.get('path')
    console.log(title,level,path)
    //<div>{JSON.stringify(params.id)}</div>
  return (
    <div>
        <div>Problem</div>
        <MarkdownProblem path={`${path}/Problem.md`}/>
    </div>
  )
}

export default Problem