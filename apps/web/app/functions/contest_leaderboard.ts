

import axios from "axios";

async function leaderboard_user(contest:string,userid:string){
    try {
        const resp = await axios.post(`http://localhost:4000/contest/${contest}/data`,{userId:userid});
        console.log(`http://localhost:4000/contest/${contest}/data`);
        const data = resp.data;
        return {data,status:200,message:"Success"}
    } catch (error) {
        return {message:"Error in leaderboard",status:404}
    }
}

export default leaderboard_user;