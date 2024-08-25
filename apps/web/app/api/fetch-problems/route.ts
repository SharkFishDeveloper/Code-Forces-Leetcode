"use server"

import { NextResponse } from "next/server";
import prisma from "../../../util/prismaDb";

export async function GET() {
    try {
        const data = await prisma.problems.findMany({
            take:10,
            select:{
                slug:true,
                level:true,
            }
        });
        console.log(data);
        return NextResponse.json({message:data,status:"200",error:null})
    } catch (error) {
        return NextResponse.json({message:[],status:"400",error:error});
    }
}