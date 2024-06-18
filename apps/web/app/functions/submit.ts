import axios from "axios";
import { createClient } from "redis";

export interface submitReq {
    selectedLanguage:string,
    code:string,
    userId:string
}

const redis = createClient();

redis.on('error', (err) => console.log('Redis Client Error', err));

async function connectRedis() {
    await redis.connect();
}

connectRedis().catch(console.error);

async function Submit(submitReq:submitReq) {
    try {
        const resp = await axios.get("http://localhost:4000");
        await redis.hSet(submitReq.userId,{"code":submitReq.code,"language":submitReq.selectedLanguage}); 
        console.log(resp);
    } catch (error) {
        console.log(error);
    }
}
export {Submit};