"use server"

import axios from "axios";

async function contestProblem(data:any) {
   try {
    const userData:{contest:string,solvedProblems:number,allproblems:number,score:number,user:any,time:number,username:string | null | undefined} = data;
    console.log(userData);
    const resp = await axios.post(`http://localhost:4000/contest/${userData.contest}`,userData);
    console.log(resp.data);
    return {message:"Submitted"};
   } catch (error) {
    return {message:"An error while submission"}
   }
}
export default contestProblem;


// contest: string;
//     solvedProblems: number;
//     allproblems: number | undefined;
//     score: number;
//     user: any;
//     time: number;
//     username: string | null | undefined;