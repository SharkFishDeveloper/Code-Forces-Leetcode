
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

function generateBoilerPlate(problem:string,difficulty:string){

    const inputpath       = path.join(__dirname,PROBLEM_PATH,problem,"Structure.md");
    const boilerplatepath = path.join(__dirname,PROBLEM_PATH,problem,"boilerplate");
    const fullBoilerplate = path.join(__dirname,PROBLEM_PATH,problem,"full-boilerplate");
    
        if ((!fs.existsSync(path.join(__dirname,PROBLEM_PATH,problem)))) {
            console.log("No such problem !!");
            rl.question('There is no such problem :( do you want to make it ? (y/n): ', (ans) => {
                if (ans.toLowerCase()==="y") {
                        fs.mkdirSync(path.join(__dirname, PROBLEM_PATH, problem), { recursive: true });
                        fs.writeFileSync(path.join(__dirname, PROBLEM_PATH, problem, 'Structure.md'), '');
                        fs.writeFileSync(path.join(__dirname, PROBLEM_PATH, problem, 'Problem.md'), '');
                         console.log("File created, now fill Structure.md !!");
                        
                        rl.close();
                    
                    processInputFiles(problem, difficulty,inputpath,boilerplatepath, fullBoilerplate);
                } else {
                    console.log("No problem created.");
                }
            });
        } else {
             processInputFiles(problem, difficulty,inputpath,boilerplatepath, fullBoilerplate);
        }
    }

function processInputFiles(problem: string,difficulty:string,inputpath:string, boilerplatepath: string, fullBoilerplate: string) {
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
    const functionName = partialParser.functionName;

//!
    const data = fs.readFileSync(path.join(__dirname, '../../web/util/Problems.json'),"utf-8");
    let problems:{title:string,path:string,level:string}[] = JSON.parse(data);
    const existsProb = problems.some((problemQ:any)=>problemQ.title===problem);
    if(!existsProb){
        const difficultyLevel = difficulty === "e"?"easy":difficulty === "m"?"medium":difficulty === "h"?"hard":"u";
        problems.push({title:problem,path:`../../problems/${problem}`,level:difficultyLevel});
        fs.writeFileSync((path.join(__dirname, '../../web/util/Problems.json')), JSON.stringify(problems, null, 2));
    }
    
    // console.log("data",problems);

//!

    const fullBoiler = new FullBoilerplate(cppCode,javaCode,problem,inputFields,outputFields,functionName);

    const fcppCode = fullBoiler.generateCpp();
    const fjavaCode = fullBoiler.generateJava();
    console.log(fcppCode)
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



rl.question('Please enter the name of the problem file or type cts: ', (problemFileName) => {
    if(problemFileName.toLowerCase()==="cts"){
        rl.question("Enter id of contest : or type (show) :",(id)=>{
            var data = fs.readFileSync(path.join(__dirname, '../../web/util/Contests.json'),"utf-8");
            if(id.toLowerCase()==="show"){
                var data = fs.readFileSync(path.join(__dirname, '../../web/util/Contests.json'),"utf-8");
                const dataContest:{contest:string,problems:{title:string,path:string,level:string,score:string,date:Date}[]}[] = JSON.parse(data);
                dataContest.forEach((item,index)=>{
                    console.log(`Contest name - ${item.contest} `);
                    console.log(`${item.problems.map((ite,ind)=>{
                        console.log(`Problem - ${ite.title} Level - ${ite.level} Score - ${ite.score}`)
                    }).join("")}`)
                })
                return;
            }
            else if(!id){
                return console.log("Enter some round")
            }
            const a:{contest:string,problems:{title:string,path:string,level:string,score:string,date:Date}[]}[] =data? JSON.parse(data):[];

            const round =a.length!==0? a.some((item:{contest:string,problems:{title:string,path:string,level:string,score:string,date:Date}[]})=>item.contest===id):undefined;
             if(!round){
                rl.question("Do you want to create this round ? :(y/n/show) ",(sol)=>{
                if(sol.toLowerCase()==="y"){
                const probData = fs.readFileSync(path.join(__dirname, '../../web/util/Problems.json'),"utf-8");
                let problemsData:{title:string,path:string,level:string}[] = JSON.parse(probData);
                rl.question("Enter all problems followed by level like a:level,b:level ",(problem)=>{
                const problems = problem.split(",")

                const keys:string[] = [];
                const values:string[] = [];

                problems.forEach(pair => {
                    const [key, value] = pair.split(':');
                    keys.push(key);
                    if(value===undefined)return console.log("Enter appropriate data ")
                    values.push(value);
                  
                });
                const problemDs:{title:string,path:string,level:string,score:string,date:Date}[]=[];
                let allProblemsExist = keys.every(prob => {
                    let probExists = problemsData.find(p => p.title === prob.trim());
                    if (!probExists) {
                        console.log(`The problem does not exist - ${prob}`);
                        return ;
                    }
                    return true;
                });

                if(allProblemsExist){
                    keys.forEach((prob,index)=>{
                        let probExists = problemsData.find((p)=>p.title===prob.trim());
                        if(!probExists){
                            return console.log(`The problem does not exist - ${prob}`);
                        }else{
                            problemDs.push({
                                title: probExists.title,
                                path: probExists.path,
                                level: probExists.level,
                                score: values[index].toString(),
                                date: new Date()
                            });
                        }
                    })
                }

                a.push({contest:id,problems:problemDs})
                // try {
                   
                // } catch (error) {
                //     console.log(error)
                // }
                //  console.log(JSON.stringify(a));
                if(problemDs.length!==0){
                    fs.writeFileSync((path.join(__dirname, '../../web/util/Contests.json')), JSON.stringify(a, null, 2));  
                }
                 return console.log("Created contest problems");
                        })
                    }
                    else if(sol.toLowerCase()==="n"){
                        console.log("No contest created ")
                    }

                    else{
                    console.log("Enter appropriate data !!")
                    return;                
                    }
                })
            }
            else{
                rl.question("Update or delete contest :(u/d/show) ",(ans)=>{
                    if(!ans){
                        return console.log("No ans given")
                    }
                    else if(ans.toLowerCase()==="u"){




                        var data = fs.readFileSync(path.join(__dirname, '../../web/util/Contests.json'),"utf-8");
                        //* this is real contest data
                        const a:{contest:string,problems:{title:string,path:string,level:string,score:string,date:Date}[]}[] = JSON.parse(data);
                        //* find that contest in a
                        const roundC = a.find((item:{contest:string,problems:{title:string,path:string,level:string,score:string,date:Date}[]})=>item.contest===id);

                        const probData = fs.readFileSync(path.join(__dirname, '../../web/util/Problems.json'),"utf-8");
                        //* find from problem in problems
                        let problemsData:{title:string,path:string,level:string}[] = JSON.parse(probData);

                        rl.question(`Enter updated problems for round ${id}: `,(updateProblems)=>{
                        const problems = updateProblems.split(",")
                        const keys:string[] = [];
                        const values:string[] = [];

                        problems.forEach(pair => {
                            const [key, value] = pair.split(':');
                            keys.push(key);
                            if(value===undefined)return console.log("Enter appropriate data ")
                            values.push(value);
                        });
                        const problemDs:{title:string,path:string,level:string,score:string,date:Date}[]=roundC?.problems ? roundC?.problems:[];

                        console.log(keys,values)
                        let allProblemsExist = keys.every(prob => {
                            let probExists = roundC?.problems.find((p)=>p.title===prob);
                            let pQ = problemsData.find((p)=>p.title===prob);
                            if(probExists){
                                return console.log("Problem already exists in round",prob)
                            }else if(!pQ){
                                return console.log("This problem does not exist")
                            }
                            return true;
                        });
                                
                        if(allProblemsExist){
                            keys.forEach((prob,index)=>{
                                let probExists = problemsData.find((p)=>p.title===prob.trim());
                                if(!probExists){
                                    return console.log(`The problem does not exist - ${prob}`);
                                }else{
                                    problemDs.push({
                                        title: probExists.title,
                                        path: probExists.path,
                                        level: probExists.level,
                                        score: values[index].toString(),
                                        date: new Date()
                                    });
                                }
                            })
                            let contestIndex = a.findIndex(item => item.contest === id);
                            if (contestIndex) {
                                a[contestIndex].problems = problemDs;
                            }
                            // a.push({ contest: id, problems: problemDs });
                            console.log(problemDs);
                            // probData
                            fs.writeFileSync((path.join(__dirname, '../../web/util/Contests.json')), JSON.stringify(a, null, 2));
                            console.log("Created contest")
                        }

                    }
                )                 
                    }
                    else if(ans.toLowerCase()==="show"){
                        var data = fs.readFileSync(path.join(__dirname, '../../web/util/Contests.json'),"utf-8");
                    const dataContest:{contest:string,problems:{title:string,path:string,level:string,score:string,date:Date}[]}[] = JSON.parse(data);
                    const aq = dataContest.findIndex(item=>item.contest===id);
                    const dataP = dataContest[aq];
                    console.log(`Contest - ${dataP.contest}`);
                    dataP.problems.map((item)=>{
                        console.log(`Problem - ${item.title} Level - ${item.level} Score - ${item.score}`)
                    });
                    }
                    else if(ans.toLowerCase()==="d"){
                        var data = fs.readFileSync(path.join(__dirname, '../../web/util/Contests.json'),"utf-8");
                        //* this is real contest data
                        const a:{contest:string,problems:{title:string,path:string,level:string,score:string,date:Date}[]}[] = JSON.parse(data);
                        //* find that contest in a
                        const indexCon = a.findIndex((item)=>item.contest===id);
                        a.splice(indexCon,1);
                        fs.writeFileSync((path.join(__dirname, '../../web/util/Contests.json')), JSON.stringify(a, null, 2));
                            console.log("Deleted contest")
 
                    }

                })
                return console.log(round);
            }
        }
    )
    }









    rl.question("What is its difficulty :(e/m/h)",(ans)=>{
        if(ans.toLowerCase()!=="e" && ans.toLowerCase()!=="m"&& ans.toLowerCase()!=="h"){
            return console.log("Enter appropriate difficulty !!");
        }
        else{
            generateBoilerPlate(problemFileName,ans.toLowerCase());
        }
    })
});
