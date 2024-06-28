
import readline from "readline";
import fs from "fs";
import path from "path";
import { PROBLEM_PATH } from "./util/path";
import { ProblemDefinitionParser } from "./userBoiler";
import { FullBoilerplate } from "./fullboilerplate";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

function generateBoilerPlate(problem:string){

    const inputpath       = path.join(__dirname,PROBLEM_PATH,problem,"Structure.md");
    const boilerplatepath = path.join(__dirname,PROBLEM_PATH,problem,"boilerplate");
    const fullBoilerplate = path.join(__dirname,PROBLEM_PATH,problem,"full-boilerplate");
    
        if ((!fs.existsSync(path.join(__dirname,PROBLEM_PATH,problem)))) {
            console.log("No such problem !!");
            rl.question('There is no such problem :( do you want to make it ? (y/n): ', (ans) => {
                if (ans.toLowerCase()==="y") {
                    // rl.question("Enter name of problem: ", (prob) => {
                        fs.mkdirSync(path.join(__dirname, PROBLEM_PATH, problem), { recursive: true });
                        fs.writeFileSync(path.join(__dirname, PROBLEM_PATH, problem, 'Structure.md'), '');
                         console.log("File created, now fill Structure.md !!");
                        
                        rl.close();
                    // });
                    
                    processInputFiles(problem, inputpath,boilerplatepath, fullBoilerplate);
                } else {
                    console.log("No problem created.");
                }
            });
        } else {
             processInputFiles(problem, inputpath,boilerplatepath, fullBoilerplate);
        }
    }

function processInputFiles(problem: string,inputpath:string, boilerplatepath: string, fullBoilerplate: string) {
    const fileContent = fs.readFileSync(inputpath,'utf-8');
    if(fileContent===""){
        return console.log("Empty structure.md file !!")
    }
    const partialParser = new ProblemDefinitionParser();
    partialParser.parse(fileContent);
    const cppCode = partialParser.functionCpp();
    const jsCode = partialParser.functionJs();
    const javaCode = partialParser.functionJava();
    const pythonCode = partialParser.functionPython();
    const rustCode = partialParser.functionRust();
    if(!fs.existsSync(boilerplatepath)){
        fs.mkdirSync(boilerplatepath,{recursive:true})
    }
    fs.writeFileSync(path.join(boilerplatepath,"function.cpp"),cppCode);
    fs.writeFileSync(path.join(boilerplatepath,"function.js"),jsCode);
    fs.writeFileSync(path.join(boilerplatepath,"function.java"),javaCode);
    fs.writeFileSync(path.join(boilerplatepath,"function.py"),pythonCode);
    fs.writeFileSync(path.join(boilerplatepath,"function.rs"),rustCode);
    console.log("Boilerplate code generated successfully!");
    const inputFields = partialParser.inputFields;
    const outputFields = partialParser.outputFields;
    const fullBoiler = new FullBoilerplate(cppCode,javaCode,problem,inputFields,outputFields);

    const fcppCode = fullBoiler.generateCpp();
    const fjavaCode = fullBoiler.generateJava();
    const fpythonCode = fullBoiler.generatePython();
    const fjsCode = fullBoiler.generateJs();
    const frustCode = fullBoiler.generateRust();
    if(!fs.existsSync(fullBoilerplate)){
        fs.mkdirSync(fullBoilerplate,{recursive:true})
    }
    fs.writeFileSync(path.join(fullBoilerplate,"function.cpp"),fcppCode);
    fs.writeFileSync(path.join(fullBoilerplate,"function.java"),fjavaCode);
    fs.writeFileSync(path.join(fullBoilerplate,"function.py"),fpythonCode);
    fs.writeFileSync(path.join(fullBoilerplate,"function.js"),fjsCode);
    fs.writeFileSync(path.join(fullBoilerplate,"function.rs"),frustCode);
    }



rl.question('Please enter the name of the problem file: ', (problemFileName) => {
    generateBoilerPlate(problemFileName);
});
