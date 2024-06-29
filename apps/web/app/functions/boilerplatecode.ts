"use server"

import path from "path";
import fs from "fs";

async function fetchBoilerPlateCode(pathP:string){
    const partialBoilerCode = path.join(__dirname, `../../../../../${pathP}`);
    console.log("bp fetch ---", partialBoilerCode);
    try {
        const code = fs.readFileSync(partialBoilerCode, "utf-8");
        const fullBoilerCode = partialBoilerCode.replace("boilerplate", "full-boilerplate");
        console.log("##########################")
        console.log("fetchBoilerPlateCode----------",fullBoilerCode);
        const fullcode = fs.readFileSync(fullBoilerCode, "utf-8");
        const test_case_path = path.join(partialBoilerCode,"../../test_case/sol.txt");
        const test_case_code = fs.readFileSync(test_case_path, "utf-8");
        console.log("data from here ------------", test_case_code);
        // console.log("code ------------", code);
        // console.log("fullcode ------------", fullcode);
        
        return { code, fullcode,test_case_code};
        // return code
    } catch (error) {
        console.error("Error fetching boilerplate code:", error);
        return { code: "", fullcode: "",test_case_code:"" }; // Return empty strings or handle error as needed
    }
}
export {fetchBoilerPlateCode}