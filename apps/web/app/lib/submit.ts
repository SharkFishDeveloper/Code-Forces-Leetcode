import { NextResponse } from "next/server";
import { createClient } from "redis"
// const client = createClient();
// client.connect().catch(console.error);

const submitRed = async({userId,code,selectedLanguage}:{userId:string,code:string,selectedLanguage:string})=>{
    try {
        const value = JSON.stringify({ code, selectedLanguage });
    // client.set(userId,value);

    } catch (error) {
        return NextResponse.json({message:"Not pushing into Redis"});
    }


}

export {submitRed};