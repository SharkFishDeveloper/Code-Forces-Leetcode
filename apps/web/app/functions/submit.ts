import axios from "axios";
import { getSession } from "next-auth/react";

export interface submitReq {
    selectedLanguage:string,
    code:string,
    userId:string
}

const MAX_REQUESTS_PER_MINUTE = 1;
let requestsInMinute = 0;
let lastResetTime = Date.now();

//@ts-ignore
async function Submit({code,selectedLanguage,userId}) {

    const session = await getSession();
    try {

        if (!session) {
        // console.log("No session")
        // alert("ERROR")
            return {message:"Please login first",status:300,result:"error"}; 
        // return Response.json({message:"Please login first"})
        // res.status(401).json({ message: "Unauthorized. Please sign in." });
    }

    // Rate limiting logic
    const now = Date.now();
    if (now - lastResetTime > 60000) { // Reset if more than a minute has passed
        requestsInMinute = 0;
        lastResetTime = now;
    }

    if (requestsInMinute >= MAX_REQUESTS_PER_MINUTE) {
        return { message: `Only ${MAX_REQUESTS_PER_MINUTE} are allowed in a minute, Try again after few seconds`, status: 429, result: "error" };
    }


        const resp = await axios.post("http://localhost:4000/submit-code",{code,selectedLanguage,userId});
        return {
            message: "Code executed successfully",
            result: resp.data.result
        };
        // return Response.json({message:"Code executed successfully",result:resp.data.result})
        // await redis.hSet(submitReq.userId,{"code":submitReq.code,"language":submitReq.selectedLanguage}); 

    } catch (error) {
        
        console.log(error);
        return {message:"Submitting error",status:300,result:"error"}
    }
}



export {Submit};