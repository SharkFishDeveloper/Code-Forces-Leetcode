

        ###USER_CODE_HERE

         int main() {
              vector<vector<string>> tickets1 = {{"MUC", "LHR"}, {"JFK", "MUC"}, {"SFO", "SJC"}, {"LHR", "SFO"}};
vector<string> output1 = findItinerary(tickets1);
cout << "[";
          for (int i = 0; i < output1.size(); i++) {
              cout << '\"' << output1[i] << '\"';
              if (i < output1.size() - 1) {
                  cout << ",";
              }
          }
          cout << "]" << endl;
  vector<vector<string>> tickets2 = {{"JFK", "SFO"}, {"JFK", "ATL"}, {"SFO", "ATL"}, {"ATL", "JFK"}, {"ATL", "SFO"}};
vector<string> output2 = findItinerary(tickets2);
cout << "[";
          for (int i = 0; i < output2.size(); i++) {
              cout << '\"' << output2[i] << '\"';
              if (i < output2.size() - 1) {
                  cout << ",";
              }
          }
          cout << "]" << endl;
        return 0;
    }
        
       