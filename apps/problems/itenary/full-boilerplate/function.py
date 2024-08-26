###USER_CODE_HERE
def main():
    
    result_1 = itenary([["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]])
    print(result_1)
    
    result_2 = itenary([["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]])
    print(result_2)
  
if __name__ == "__main__":
    main()