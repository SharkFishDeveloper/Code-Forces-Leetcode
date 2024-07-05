
import axios from "axios";

async function all_leader_board_user(userid:string){
try {
    const resp = await axios.get(`http://localhost:4000/contest/${userid}`);
    console.log(resp.data);
    const data = resp.data;
    return {data,status:200,message:"Success"}
} catch (error) {
    return {message:"Error in leaderboard",status:404}
}
}




    export default all_leader_board_user;
// export default {all_leader_board_user,leaderboard_user};