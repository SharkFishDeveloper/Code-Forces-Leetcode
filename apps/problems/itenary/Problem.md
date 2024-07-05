  # **Reconstruct Itinerary**


  ###  **
  You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight.
   Reconstruct the itinerary in order and return it.All of the tickets belong to a man who departs from "JFK", thus, the itinerary must begin with "JFK". 
  If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.
**

**Test case 1**
 ```
  tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
 ```
 **Output**
 ```
["JFK","MUC","LHR","SFO","SJC"]
 ```
   **Test case 2**
 ```
 tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
 ```
  **Output**
 ```
  ["JFK","ATL","JFK","SFO","ATL","SFO"]
 ```
  **Test case 2**
 ```
 2 -2
 ```
 **Output**
 ```
 0
 ```
 