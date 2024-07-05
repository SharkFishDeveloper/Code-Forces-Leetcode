import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";

const redis = createClient();
redis.connect().catch((e)=>console.log(e));

export async function POST(req:NextRequest){
    //add session if not then ask for login
    // return NextResponse.json({message:"Pushed in redis"});
    try {
        const {userId,selectedLanguage,code} = await req.json();
        const resp = await axios.get("http:localhost:3000/");
        return NextResponse.json({message:resp})
        // const data = JSON.stringify(code,selectedLanguage);
        // await redis.hSet(userId,{"code":code,"language":selectedLanguage});
        await redis.hSet(userId, { code, selectedLanguage });
        // await redis.set(userId,data);
        return NextResponse.json({message:"Pushed in redis"});
    } catch (error) {
        return NextResponse.json({message:"Problem pushing in redis"})
    }
}