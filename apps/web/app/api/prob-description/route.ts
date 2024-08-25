"use server"

import { NextRequest, NextResponse} from "next/server";
import prisma from "@repo/db/prisma";


export async function POST(req:NextRequest){
    const {slug} =  await req.json();
    try {
        let problems = await prisma.problems.findUnique({where:{
            slug:slug,
        },
        select:{
        description:true,
        // boilerplateCppHalf:true,
        test_cases:true,
        test_cases_ans:true,
        // boilerplateCppFull:true
        }});
        return  NextResponse.json({message:{
            description:problems?.description,
            test_cases:problems?.test_cases,
            test_cases_ans:problems?.test_cases_ans
            // boilerplatehalfcode:problems?.boilerplateCppHalf,
            // boilerplatefullcode:problems?.boilerplateCppFull,
            // test_cases:problems?.test_cases,
            // test_cases_ans:problems?.test_cases_ans
        }},{status:200})
    } catch (error) {
        return  NextResponse.json({error:error},{status:400})
    }
}
prisma.$disconnect();