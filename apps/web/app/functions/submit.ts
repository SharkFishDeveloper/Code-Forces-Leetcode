import axios from "axios";
import { NextResponse } from "next/server";
import { createClient } from "redis";

export interface submitReq {
    selectedLanguage:string,
    code:string,
    userId:string
}

// const redis = createClient();

// redis.on('error', (err) => console.log('Redis Client Error', err));

// async function connectRedis() {
//     await redis.connect();
// }

// connectRedis().catch(console.error);
//@ts-ignore
async function Submit({code,selectedLanguage,userId}) {
    try {
        // const body = {submitReq.userId,submitReq.code,submitReq.selectedLanguage};
        const resp = await axios.post("http://localhost:4000/submit-code",{code,selectedLanguage,userId});
        return {
            message: "Code executed successfully",
            result: resp.data.result
        };
        // return Response.json({message:"Code executed successfully",result:resp.data.result})
        // await redis.hSet(submitReq.userId,{"code":submitReq.code,"language":submitReq.selectedLanguage}); 

    } catch (error) {
        console.log(error);
    }
}
export {Submit};