

import axios from "axios";
import BACKEND_URL from "./backendurl";

async function leaderboard_user(contest:string,userid:string){
    console.log("))))))))))", contest,userid)
    try {
        const resp = await axios.post(`${BACKEND_URL}/contest/${contest}/data`,{userId:userid});
        console.log(`${BACKEND_URL}/${contest}/data`);
        const data = resp.data;
        console.log("DATA L ---------------- ",data)
        return {data,status:200,message:"Success"}
    } catch (error) {
        return {message:"Error in leaderboard",status:404}
    }
}

export default leaderboard_user;