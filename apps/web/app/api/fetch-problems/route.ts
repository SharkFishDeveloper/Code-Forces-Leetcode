"use server"

import { NextResponse } from "next/server";
import prisma from "../../../util/prismaDb";
import { getAsync, setAsync } from "../../functions/redisConnect/redis";


export async function GET() {
    try {
        const cacheKey = `problemset-1`;
        let cachedData = await getAsync(cacheKey);
        if(cachedData){
            const parsedData = JSON.parse(cachedData)
            console.log("PROBLEM SET HIT",JSON.parse(cachedData))
            return NextResponse.json({message:parsedData,status:"200",error:null})
        }
        await prisma.$connect();
        const data = await prisma.problems.findMany({
            take:10,
            select:{
                slug:true,
                level:true,
            }
        });
        await setAsync(cacheKey,JSON.stringify(data),"EX",7200);
        return NextResponse.json({message:data,status:"200",error:null})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:[],status:"400",error:error});
    }
}