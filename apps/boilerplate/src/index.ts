
import readline from "readline";
import fs from "fs";
import path from "path";
import { PROBLEM_PATH } from "./util/path";
import { ProblemDefinitionParser } from "./userBoiler";


function generateBoilerPlate(problem:string){
    const inputpath = path.join(__dirname,PROBLEM_PATH,problem,"Structure.md");
    const boilerplatepath = path.join(__dirname,PROBLEM_PATH,problem,"boilerplate");
    const fileContent = fs.readFileSync(inputpath,'utf-8');
    console.log(boilerplatepath);
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
}






const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please enter the name of the problem file: ', (problemFileName) => {
    generateBoilerPlate(problemFileName);
    rl.close();
});