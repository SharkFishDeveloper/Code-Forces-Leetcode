import axios from "axios";
import { getSession } from "next-auth/react";
import BACKEND_URL from "./backendurl";

export interface submitReq {
    selectedLanguage:string,
    code:string,
    userId:string
}

//@ts-ignore
async function Submit({code,selectedLanguage}) {
    let language = selectedLanguage === "javascript" ? "js" : selectedLanguage
    const session = await getSession();
    var userId;
    try {
        if (!session) {
            return {message:"Please login first",status:300,result:"error"}; 
        }
    //@ts-ignore
    userId =  session?.user.id;

        const resp = await axios.post(`${BACKEND_URL}/submit-code`,{code,selectedLanguage:language,userId});
        console.log(resp.data)
        if(resp.data.stderr!==undefined){
            return {
                message: "Please fix your code",
                result: resp.data.stderr
            };
        }
        return {
            message: "Code executed successfully",
            result: resp.data.result
        };

    } catch (error) {
        
        console.log(error);
        return {message:"Submitting error",status:300,result:"error"}
    }
}



export {Submit};