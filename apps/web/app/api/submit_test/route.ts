import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";

const redis = createClient();
redis.connect().catch((e)=>console.log(e));

export async function POST(req:NextRequest){
    //add session if not then ask for login
    // return NextResponse.json({message:"Pushed in redis"});
    try {
        const {userId,selectedLanguage,code} = await req.json();
        await redis.set(userId,code,selectedLanguage);
        return NextResponse.json({message:"Pushed in redis"});
    } catch (error) {
        return NextResponse.json({message:"Problem pushing in redis"})
    }
}