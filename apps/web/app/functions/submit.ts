import axios from "axios";
import { getSession } from "next-auth/react";

export interface submitReq {
    selectedLanguage:string,
    code:string,
    userId:string
}

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