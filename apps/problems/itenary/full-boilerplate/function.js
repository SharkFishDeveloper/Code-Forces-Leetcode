###USER_CODE_HERE
function main() {
    
        const result1 = findItinerary([["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]);
        console.log(result1);
    
        const result2 = findItinerary([["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]);
        console.log(result2);
}

main();