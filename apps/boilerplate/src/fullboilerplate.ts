import fs from "fs";
import path from "path";
import { PROBLEM_PATH } from "./util/path";

export class FullBoilerplate{
    cppCode:string="";
    javaCode:string="";
    problem:string="";
    testcases:any[] = [];
    inputFields:{type:string,name:string}[] = [];
    outputFields:{type:string,name:string}[] = [];


    constructor(cppCode:string,javaCode:string,problem:string,inputFields:{type:string,name:string}[],outputFields:{type:string,name:string}[]){
        this.cppCode = cppCode;
        this.javaCode = javaCode;
        this.problem=problem;
        this.inputFields = inputFields;
        this.outputFields = outputFields;
        this.parseTestCase();
    }
    
    parseTestCase(){
        const bplatePath = path.join(__dirname,PROBLEM_PATH,this.problem,"test_case");
        console.log(this.problem);
        if(!fs.existsSync(path.join(bplatePath,"test.txt"))){
            console.log("Make test cases first !! Here I created files enjoy :)");
            console.log("Test cases should be in one line !!")
            fs.mkdirSync(bplatePath);
            fs.writeFileSync(path.join(bplatePath,"test.txt"),'');
            fs.writeFileSync(path.join(bplatePath,"sol.txt"),'');
            return ;
        }

        const file_content = fs.readFileSync(path.join(__dirname,PROBLEM_PATH,this.problem,"test_case","test.txt"),"utf-8");
        const lines = file_content.trim().split('\n');
        lines.forEach((line)=>{
            const trimmedLine = line.trim();
            const values = trimmedLine.split(/\s+/)
            if(trimmedLine!==''){
                const transformedValues = values.map((item)=>{
                    console.log(item);
                })
                this.testcases.push(values);
            }
        })
        this.generateCpp();
        console.log(this.testcases);
        console.log(this.inputFields);
        console.log(this.outputFields)
    }



    generateCpp():string{
        const cppCode = `
        #include <iostream>
        using namespace std;

        ###USER_CODE_HERE

         int main() {
        ${this.testcases.map((test, index) => `
            
            ${this.outputFields[0].type} a${index + 1} = ${this.problem}(${test.map(
            
                (            t: any[]) =>`${t}`)});
        cout<< a${index + 1}<<endl;`).join('\n        ')}
        return 0;
    }
        
       `;
        return cppCode;
    }

    generateJava(): string {
        const javaCode = `
            public class Main {
                public static void main(String[] args) {
                    ${this.testcases.map((test, index) => `
                        ${this.outputFields[0].type} result${index + 1} = ${this.problem}(${test.map((t: any) => `${t}`).join(', ')});
                        System.out.println(result${index + 1});`).join('\n                ')}
                }
                ###USER_CODE_HERE
            }
        `;
        return javaCode;
    }
    
    generatePython(): string {
        const pythonCode = `
        ###USER_CODE_HERE
def main():
        ${this.testcases.map((test, index) => `
            result_${index + 1} = ${this.problem}(${test.map((t: any) => `${t}`).join(', ')})
            print(result_${index + 1})`).join('\n    ')}
    
if __name__ == "__main__":
        main()
    `;
        return pythonCode.trim(); // Trim to remove any leading/trailing whitespace
    }
    
    generateJs(): string {
        const jsCode = `
           ###USER_CODE_HERE
    function main() {
        ${this.testcases.map((test, index) => `
        const result${index + 1} = ${this.problem}(${test.map((t: any) => `${t}`).join(', ')});
        console.log(result${index + 1});`).join('\n    ')}
    }
    
    main();
        `;
        return jsCode.trim(); // Trim to remove any leading/trailing whitespace
    }
    

    generateRust(): string {
        const rustCode = `
            fn main() {
                // Add user code here
                ###USER_CODE_HERE
                
                ${this.testcases.map((test, index) => `
                let result${index + 1} = ${this.problem}(${test.map((t: any) => `${t}`).join(', ')});
                println!("{}", result${index + 1});`).join('\n            ')}
            }
        `;
        return rustCode.trim(); // Trim to remove any leading/trailing whitespace
    }
    


}
