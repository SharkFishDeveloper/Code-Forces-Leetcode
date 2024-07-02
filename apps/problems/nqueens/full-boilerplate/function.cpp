
        #include <iostream>
        using namespace std;

        ###USER_CODE_HERE

         int main() {
              int num1 = 4;
vector<vector<string>> output1 = nqueens(num1);
cout << "[";
          for (int i = 0; i < output1.size(); i++) {
              cout << "[";
              for (int j = 0; j < output1[i].size(); j++) {
                  cout << "\"" << output1[i][j] << "\"";
                  if (j < output1[i].size() - 1) {
                      cout << ",";
                  }
              }
              cout << "]";
              if (i < output1.size() - 1) {
                  cout << ",";
              }
          }
          cout << "]" << endl;
  int num2 = 1;
vector<vector<string>> output2 = nqueens(num2);
cout << "[";
          for (int i = 0; i < output2.size(); i++) {
              cout << "[";
              for (int j = 0; j < output2[i].size(); j++) {
                  cout << "\"" << output2[i][j] << "\"";
                  if (j < output2[i].size() - 1) {
                      cout << ",";
                  }
              }
              cout << "]";
              if (i < output2.size() - 1) {
                  cout << ",";
              }
          }
          cout << "]" << endl;
        return 0;
    }
        
       