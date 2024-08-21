import fs from "fs";
import path from "path";
import { PROBLEM_PATH } from "./util/path";

export class FullBoilerplate{
    cppCode:string="";
    javaCode:string="";
    problem:string="";
    testcases:any[] = [];
    testcases_ans:any[] = [];
    inputFields:{type:string,name:string}[] = [];
    outputFields:{type:string,name:string}[] = [];
    functionName:string="";


    constructor(cppCode:string,javaCode:string,problem:string,inputFields:{type:string,name:string}[],outputFields:{type:string,name:string}[],functionName:string){
        this.cppCode = cppCode;
        this.javaCode = javaCode;
        this.problem=problem;
        this.inputFields = inputFields;
        this.outputFields = outputFields;
        this.parseTestCase();
        this.functionName = functionName;
    }
    
    parseTestCase(){
        const bplatePath = path.join(__dirname,PROBLEM_PATH,this.problem,"test_case");
        console.log(this.problem);

        if(!fs.existsSync(path.join(bplatePath,"test.txt"))){
            console.log("Make test cases first !! Here I created files enjoy :)");
            console.log("Test cases should be in one line and after one line")
            fs.mkdirSync(bplatePath);
            fs.writeFileSync(path.join(bplatePath,"test.txt"),'');
            fs.writeFileSync(path.join(bplatePath,"sol.txt"),'');
            return ;
          }
        const testPath = path.join(__dirname,PROBLEM_PATH,this.problem,"test_case","test.txt");
        const ansPath = path.join(__dirname,PROBLEM_PATH,this.problem,"test_case","sol.txt");

        const file_content = fs.readFileSync(testPath,"utf-8");
        console.log("problem",path.join(__dirname,PROBLEM_PATH,this.problem,"test_case","test.txt"),"file_content");

        
        const file_content_testans = fs.readFileSync(ansPath,"utf-8");
        console.log("problem",path.join(__dirname,PROBLEM_PATH,this.problem,"test_case","sol.txt"),"file_content_ans");
        
        const lines_test = file_content.trim().split('\n');
        const lines_ans = file_content_testans.trim().split('\n');

        lines_test.forEach((line,i)=>{
          const trimmedLine = line.trim();
          if(trimmedLine!==''){
            console.log("INDEX",i,trimmedLine);
            this.testcases.push(trimmedLine);
          }
        })


        lines_ans.forEach((line,i)=>{
          const trimmedLine = line.trim();
          if(trimmedLine!==''){
            // console.log("INDEX ",i,line)
            this.testcases_ans.push(line);
          }
      })

        console.log(this.inputFields);
        console.log(this.outputFields)
        this.generateCpp();
    }

    


    generateCpp():string{
        const stateCpp = () => {
            return this.testcases
            .map((item, index) => { 
                const splitItem = item.split(" ");
                let ds = [];
                let code = "";
                for (let i = 0; i < this.inputFields.length; i++) {
                  const a = resultCpp(this.inputFields[i].type); //name
                  const b = this.inputFields[i].name;
                  const value = parseInputCpp(a, splitItem[i]); //value
                  ds.unshift(`${b}${index + 1}`);
                  code += `  ${a} ${b}${index + 1} = ${value};\n`;
                }
                code += `${resultCpp(this.outputFields[0].type)} output${index + 1} = ${this.functionName}(${ds.reverse()});\n`;
                const outputPrint = outputPrintLogCpp(
                    this.outputFields[0].type,
                  `output${index + 1}`,
                );
                code += outputPrint;
                return code;
              })
              .join("\n");
          };
        const cppCode = `

        ###USER_CODE_HERE

         int main() {
            ${stateCpp()}
        return 0;
    }
        
       `;
        return cppCode;
    }


    generateJava(): string {

        const state = ()=>{
           return this.testcases.map((item, index) => {
                console.log("INDEX MAP",index,item);
                const splitItem = item.split(" ");
                let ds = [];
                let code:string="";
                for (let i = 0; i < this.inputFields.length; i++) {
                  const a = resultJava(this.inputFields[i].type); //name
                  const b = this.inputFields[i].name;
                  console.log("value",splitItem[i]);
                  const value = parseInputJava(a, splitItem[i]); //value
                  ds.unshift(`${b}${index + 1}`);
                  code+=`${a} ${b}${index + 1} = ${value};\n`;
                }
                code+=(`${resultJava(this.outputFields[0].type)} output${index+1} = ${this.functionName}(${ds.reverse()});\n`);
                const outputPrint = outputPrintLog(this.outputFields[0].type,`output${index+1}`);
                code+=`${outputPrint}\n`;
                return code;
              });
        }
        let javaCode = `
            public class Main {
                public static void main(String[] args) {
                    ${state().join(" ")}

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
      ${this.testcases.map((test, index) => {
          // Assuming `test` is a string that needs to be split by space
          const splitTest = test.split(" "); // Split test string into individual elements
  
          return `
      result_${index + 1} = ${this.problem}(${splitTest.map((t: any) => `${t}`).join(', ')})
          print(result_${index + 1})`;
      }).join('\n    ')}
  
if __name__ == "__main__":
      main()
      `;
      return pythonCode.trim();
  }
    
  
  generateJs(): string {
    const jsCode = `
        ###USER_CODE_HERE
function main() {
    ${this.testcases.map((test, index) => {
        // Assuming `test` is a string that needs to be split by spaces
        const splitTest = test.split(" "); // Split test string into individual elements

        return `
        const result${index + 1} = ${this.functionName}(${splitTest.map((t: any) => `${t}`).join(', ')});
        console.log(result${index + 1});`;
    }).join('\n    ')}
}

main();
    `;
    return jsCode.trim();
}

    

    // generateRust(): string {
    //     const rustCode = `
    //         fn main() {
    //             // Add user code here
    //             ###USER_CODE_HERE
                
    //             ${this.testcases.map((test, index) => `
    //             let result${index + 1} = ${this.problem}(${test.map((t: any) => `${t}`).join(', ')});
    //             println!("{}", result${index + 1});`).join('\n            ')}
    //         }
    //     `;
    //     return rustCode.trim(); // Trim to remove any leading/trailing whitespace
    // }
    


}



const resultJava = ((ds:any) => {
    switch(ds) {
      case "double":
        return "double";
      case "boolean":
        return "boolean";
      case "int":
        return "int";
      case "list<int>":
        return "int[]";
      case "list<list<int>>":
        return "int[][]";
      case "char":
        return "char";
      case "list<char>":
        return "char[]";
      case "list<list<char>>":
        return "char[][]";
      case "string":
        return "String";
      case "list<string>":
        return "List<String>";
      case "list<list<string>>":
        return "List<List<String>>"
      default:
        return null;
    }
  });
  //@ts-ignore
  function parseInputJava(input,value){
    switch(input){
      case "boolean":
        return value;
      case "double":
        return value;
      case "int":
        return value;
      case "int[]":
        return value.replace(/\[/g, '{').replace(/\]/g, '}');
      case "int[][]":
        return value.replace(/\[/g, '{').replace(/\]/g, '}');
      case "char":
        return value;
      case "char[]":
        return value.replace(/\[/g, '{').replace(/\]/g, '}');
      case "char[][]":
        return value.replace(/\[/g, '{').replace(/\]/g, '}').replace(/"/g, "'");
      case "String":
        return value;
      case "List<String>":
        let arr = JSON.parse(value);
        let java = `Arrays.asList(
          ${arr.map((elem:any) => `"${elem}"`).join(', ')}
        )`;
        return java;
      case "List<List<String>>":
         let arrays = JSON.parse(value);
        let javaCode = `Arrays.asList(
          ${arrays.map((inner:any) => `Arrays.asList(${inner.map((elem:any) =>             
          JSON.stringify(elem)).join(', ')})`).join(',\n  ')}
        )`;
        return javaCode;
    }
  }

  const outputPrintLog = (type:any,name:any)=>{
    const typeN = resultJava(type);
    // console.log("typeN",typeN);
    switch(typeN){
      case "int":
        return `System.out.println(${name});`
        
      case "char":
        return `System.out.println(${name});`
        
      case "boolean":
        return `System.out.println(${name});`
        
      case "double":
        return `System.out.println(${name});`
        
      case "String":
        return `System.out.println(${name});`
  
      case "char[]":
        const a = ` System.out.print("[");
          for (int i = 0; i < ${name}.length; i++) {
              System.out.print("'" + ${name}[i] + "'");
              if (i < ${name}.length - 1) {
                  System.out.print(", ");
              }
          }
          System.out.println("]");`;
        return a;
        
      case "int[]":
        return  `System.out.println(Arrays.toString(${name}));`
  
      case "char[][]":
        const b = ` System.out.print("[");
          for (int i = 0; i < ${name}.length; i++) {
              System.out.print("[");
              for (int j = 0; j < ${name}[i].length; j++) {
                  System.out.print("'" + ${name}[i][j] + "'");
                  if (j < ${name}[i].length - 1) {
                      System.out.print(",");
                  }
              }
              System.out.print("]");
              if (i < ${name}.length - 1) {
                  System.out.print(",");
              }
          }
          System.out.println("]");`;
        return b;
  
      case "int[][]":
        const aq = ` System.out.print("[");
          for (int i = 0; i < ${name}.length; i++) {
              System.out.print("[");
              for (int j = 0; j <  ${name}[i].length; j++) {
                  System.out.print( ${name}[i][j]);
                  if (j <  ${name}[i].length - 1) {
                      System.out.print(",");
                  }
              }
              System.out.print("]");
              if (i <  ${name}.length - 1) {
                  System.out.print(",");
              }
          }
          System.out.println("]");`
        return aq;

      case "List<String>":
        const az = `
         System.out.print("[");
          for (int i = 0; i < ${name}.size(); i++) {
               System.out.print("\\"" + ${name}.get(i) + "\\"");
              if (i < ${name}.size() - 1) {
                  System.out.print(", ");
              }
          }
          System.out.println("]");`;
        return az;
  
      case "List<List<String>>":
        const z = ` System.out.print("[");
          for (int i = 0; i < ${name}.size(); i++) {
              System.out.print("[");
              for (int j = 0; j < ${name}.get(i).size(); j++) {
                  System.out.print("\" + ${name}.get(i).get(j) + "\");
                  if (j < ${name}.get(i).size() - 1) {
                      System.out.print(",");
                  }
              }
              System.out.print("]");
              if (i < ${name}.size() - 1) {
                  System.out.print(",");
              }
          }
          System.out.println("]");`;
        return z;
    }
  }
  

  const resultCpp = (ds:any) => {
    switch (ds) {
      case "double":
        return "double";
      case "boolean":
        return "bool";
      case "int":
        return "int";
      case "list<int>":
        return "vector<int>";
      case "list<list<int>>":
        return "vector<vector<int>>";
      case "char":
        return "char";
      case "list<char>":
        return "vector<char>";
      case "list<list<char>>":
        return "vector<vector<char>>";
      case "string":
        return "string";
      case "list<string>":
        return "vector<string>";
      case "list<list<string>>":
        return "vector<vector<string>>";
      default:
        return "";
    }
  };
  
  function parseInputCpp(input:any, value:any) {
    switch (input) {
      case "boolean":
      case "double":
      case "int":
      case "char":
      case "string":
        return value;
      case "vector<int>":
      case "vector<vector<int>>":
      case "vector<char>":
      case "vector<vector<char>>":
        return value.replace(/\[/g, "{").replace(/\]/g, "}");
      case "vector<string>":
        let arr = JSON.parse(value);
        let cpp = "{";
        for (let i = 0; i < arr.length; i++) {
          cpp += `"${arr[i]}"`;
          if (i < arr.length - 1) {
            cpp += ", ";
          }
        }
        cpp += "}";
        return cpp;
      case "vector<vector<string>>":
        let arrays = JSON.parse(value);
        let cppCode = "{";
        for (let i = 0; i < arrays.length; i++) {
          cppCode += "{";
          for (let j = 0; j < arrays[i].length; j++) {
            cppCode += `"${arrays[i][j]}"`;
            if (j < arrays[i].length - 1) {
              cppCode += ", ";
            }
          }
          cppCode += "}";
          if (i < arrays.length - 1) {
            cppCode += ", ";
          }
        }
        cppCode += "}";
        return cppCode;
      default:
        return "";
    }
  }
  
  const outputPrintLogCpp = (type:any, name:any) => {
    const typeN = resultCpp(type);
    switch (typeN) {
      case "int":
      case "char":
      case "bool":
      case "double":
      case "string":
        return `cout << ${name}  << endl;`;
      case "vector<char>":
        return `cout << "[";
          for (int i = 0; i < ${name}.size(); i++) {
              cout << "'" << ${name}[i] << "'";
              if (i < ${name}.size() - 1) {
                  cout << ","; 
              }
          }
          cout << "]" << endl;`;
      case "vector<int>":
        return `cout << "[";
          for (int i = 0; i < ${name}.size(); i++) {
              cout << ${name}[i];
              if (i < ${name}.size() - 1) {
                  cout << ",";
              }
          }
          cout << "]" << endl`;
      case "vector<vector<char>>":
        return `cout << "[";
          for (int i = 0; i < ${name}.size(); i++) {
              cout << "[";
              for (int j = 0; j < ${name}[i].size(); j++) {
                  cout << "'" << ${name}[i][j] << "'";
                  if (j < ${name}[i].size() - 1) {
                      cout << ",";
                  }
              }
              cout << "]";
              if (i < ${name}.size() - 1) {
                  cout << ",";
              }
          }
          cout << "]"<< endl;`;
      case "vector<vector<int>>":
        return `cout << "[";
          for (int i = 0; i < ${name}.size(); i++) {
              cout << "[";
              for (int j = 0; j < ${name}[i].size(); j++) {
                  cout << ${name}[i][j];
                  if (j < ${name}[i].size() - 1) {
                      cout << ",";
                  }
              }
              cout << "]";
              if (i < ${name}.size() - 1) {
                  cout << ",";
              }
          }
          cout << "]"<< endl;`;
      case "vector<string>":
        return `cout << "[";
          for (int i = 0; i < ${name}.size(); i++) {
              cout << '\\"' << ${name}[i] << '\\"';
              if (i < ${name}.size() - 1) {
                  cout << ",";
              }
          }
          cout << "]" << endl;`;
      case "vector<vector<string>>":
        return `cout << "[";
          for (int i = 0; i < ${name}.size(); i++) {
              cout << "[";
              for (int j = 0; j < ${name}[i].size(); j++) {
                  cout << "\\"" << ${name}[i][j] << "\\"";
                  if (j < ${name}[i].size() - 1) {
                      cout << ",";
                  }
              }
              cout << "]";
              if (i < ${name}.size() - 1) {
                  cout << ",";
              }
          }
          cout << "]" << endl;`;
      default:
        return "";
    }
  };


  function resultRs(ds:any) {
    switch (ds) {
        case "double":
            return "f64";
        case "boolean":
            return "bool";
        case "int":
            return "i32";
        case "list<int>":
            return "Vec<i32>";
        case "list<list<int>>":
            return "Vec<Vec<i32>>";
        case "char":
            return "char";
        case "list<char>":
            return "Vec<char>";
        case "list<list<char>>":
            return "Vec<Vec<char>>";
        case "string":
            return "String";
        case "list<string>":
            return "Vec<String>";
        case "list<list<string>>":
            return "Vec<Vec<String>>";
        default:
            return "";
    }
  }
  
  
  
  const outputPrintLogRs = (type:any, name:any) => {
    const typeN = resultRs(type);
    switch (typeN) {
        case "i32":
        return `println!("i32: {}", ${name});`
        case "char":
        case "bool":
        return `println!("bool: {}", ${name});`
        case "f64":
        case "String":
            return `println!("{}", ${name});`;
        case "Vec<char>":
            return `println!("{:?}", ${name});`;
        case "Vec<i32>":
            return `println!("{:?}", ${name});`;
        case "Vec<Vec<char>>":
            return `println!("{:?}", ${name});`;
        case "Vec<Vec<i32>>":
            return `println!("{:?}", ${name});`;
        case "Vec<String>":
            return `println!("{:?}", ${name});`;
        case "Vec<Vec<String>>":
            return `println!("{:?}", ${name});`;
        default:
            return "";
    }
  };
  