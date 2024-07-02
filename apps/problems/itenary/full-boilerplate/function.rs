fn main() {
                // Add user code here
                ###USER_CODE_HERE
                
                
                let result1 = itenary([["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]);
                println!("{}", result1);
            
                let result2 = itenary([["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]);
                println!("{}", result2);
            }