
export class ProblemDefinitionParser{
    problemName:string="";
    functionName:string="";
    inputFields:{type:string,name:string}[] = [];
    outputFields:{type:string,name:string}[] = [];

    

    parse(input:string):void{
        let lines = input.split("\n").map((line)=>line.trim());
        lines.forEach((line)=>{
            if(line.startsWith("Problem name:")){
                this.problemName = this.extractValue(line);
            }
            else if(line.startsWith("Function name:")){
                this.functionName = this.extractword(line);
            }
            else if(line.startsWith("Input field:")){
                const field = this.extractTypeAndValue(line);
                if(field) this.inputFields.push(field);
            }
            else if(line.startsWith("Output field:")){
                const field = this.extractTypeAndValue(line);
                if(field) this.outputFields.push(field);
            }
            
        })
    }

    extractValue(line:string):(string){
        const match = line.match(/: "(.*)"$/);
        // console.log(match?match[1]:"");
        return match ? match[1]:"";
    }
    extractword(line:string):string{
        const match = line.match(/: "(\w+)/);
        // console.log(match ? match[1]:"");
        return match ? match[1]:"";
    }
    extractTypeAndValue(line:string):{ type: string, name:string }|null{
        let regex = /^Output field: ((?:\w+)<[\w<>]+>|[\w<>]+) (\w+)$/;
        if(line.startsWith("Input field:")){
            regex =  /^Input field: ((?:\w+)<[\w<>]+>|[\w<>]+) (\w+)$/;
        }
        const match = line.match(regex);
        // console.log(match,match ? `Type: ${match[1]}, Name: ${match[2]}` : "No match found");
        return match ? { type: match[1], name: match[2] } : null; 
    }

    functionCpp(): string {
        const input = this.inputFields.map((input) => `${this.maptypetoCpp(input.type)} ${input.name}`).join(", ");
        // console.log(input);
        //this.outputFields[0].type
        return `
//Add imports here
    ${this.maptypetoCpp(this.outputFields[0].type)} ${this.functionName} (${input}) {\n    // Your code\n    return ${this.outputFields[0].name};\n}`;
    }

    functionJs(): string {
        const input = this.inputFields.map((input) => `${input.name}`).join(", ");
        // console.log(input);
        return `
//Add imports here
    function ${this.functionName} (${input}) {\n    // Your code\n    return ${this.outputFields[0].name};\n}`;
    }

    functionJava(): string {
        const input = this.inputFields.map((input) => `${this.mapTypeToJava(input.type)} ${input.name}`).join(", ");
        // console.log(input);
        return `
//Add imports here
    public static ${this.mapTypeToJava(this.outputFields[0].type)} ${this.functionName}(${input}) {\n    // Your code\n    return ${this.outputFields[0].name};\n}`;
    }

    functionPython(): string {
        const input = this.inputFields.map(input => `${input.name}`).join(", ");
        // console.log(input); // Assuming you're using console.log for debugging purposes
 
    const pythonCode = `
def ${this.functionName}(${input}):
        # Your code
    return ${this.outputFields[0].name}
    `;
    return pythonCode.trim(); // Trim to remove any leading/trailing whitespace
    }
    

    functionRust(): string {
        const input = this.inputFields.map((input) => `${input.name}: ${this.mapTypeToRust(input.type)}`).join(", ");
        // console.log(input);
        return `fn ${this.functionName}(${input}) -> ${this.mapTypeToRust(this.outputFields[0].type)} {\n    // Your code\n    ${this.outputFields[0].name}\n}`;
    }
    

    maptypetoCpp(input:string):string{
        switch(input){
            case "int":
                return "int";
            case "float":
                return "float";
            case "string":
                return "string";
            case "bool":
                return "bool";
            case "list<int>":
                return "vector<int>"; 
            case "list<float>":
                return "vector<float>";
            case "list<string>":
                return "vector<string>";
            case "list<list<string>>":
                    return "vector<vector<string>>";
            case "list<bool>":
                return "vector<bool>";
            case "list<list<char>>":
                return "vector<vector<char>>";  
            case "list<list<int>>":
                return "vector<vector<int>>";
            case "list<list<float>>":
                return "vector<vector<float>>"; 
            default:
                return "unknown";
        }
    }

    mapTypeToJava(input: string): string {
        switch (input) {
            case "int":
                return "int";
            case "float":
                return "float";
            case "string":
                return "String";
            case "bool":
                return "boolean";
            case "list<int>":
                return "int[]";
            case "list<float>":
                return "float[]";
            case "list<string>":
                return "List<String>";
            case "list<list<string>>":
                return "List<List<String>>";
            case "list<bool>":
                return "List<Boolean>";
            case "list<list<char>>":
                return "char[][]";
            case "list<list<int>>":
                return "int[][]";
            case "list<list<float>>":
                return "ArrayList<ArrayList<Float>>";
            default:
                return "unknown";
        }
    }

    mapTypeToPython(input: string): string {
        switch (input) {
            case "int":
                return "int";
            case "float":
                return "float";
            case "string":
                return "str";
            case "bool":
                return "bool";
            case "list<int>":
                return "List[int]";
            case "list<float>":
                return "List[float]";
            case "list<string>":
                return "List[str]";
            case "list<bool>":
                return "List[bool]";
            case "list<list<char>>":
            return "List[List[str]]";
            case "list<list<string>>":
                    return "List[List[str]]";
            case "list<list<int>>":
                return "List[List[int]]";
            case "list<list<float>>":
                return "List[List[float]]";
            default:
                return "unknown";
        }
    }

    mapTypeToRust(input: string): string {
        switch (input) {
            case "int":
                return "i32";
            case "float":
                return "f32";
            case "string":
                return "String";
            case "bool":
                return "bool";
            case "list<int>":
                return "Vec<i32>";
            case "list<float>":
                return "Vec<f32>";
            case "list<string>":
                return "Vec<String>";
                case "list<list<string>>":
                    return "Vec<Vec<String>>";
            case "list<bool>":
                return "Vec<bool>";
            case "list<list<char>>":
                return "Vec<Vec<char>>";
            case "list<list<int>>":
                return "Vec<Vec<i32>>";
            case "list<list<float>>":
                return "Vec<Vec<f32>>";
            default:
                return "Unknown";
        }
    }
    
}