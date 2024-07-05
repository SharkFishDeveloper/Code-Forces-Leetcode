
            public class Main {
                public static void main(String[] args) {
                    int num1 = 4;
List<List<String>> output1 = nqueens(num1);
 System.out.print("[");
          for (int i = 0; i < output1.size(); i++) {
              System.out.print("[");
              for (int j = 0; j < output1.get(i).size(); j++) {
                  System.out.print("" + output1.get(i).get(j) + "");
                  if (j < output1.get(i).size() - 1) {
                      System.out.print(",");
                  }
              }
              System.out.print("]");
              if (i < output1.size() - 1) {
                  System.out.print(",");
              }
          }
          System.out.println("]");
 int num2 = 1;
List<List<String>> output2 = nqueens(num2);
 System.out.print("[");
          for (int i = 0; i < output2.size(); i++) {
              System.out.print("[");
              for (int j = 0; j < output2.get(i).size(); j++) {
                  System.out.print("" + output2.get(i).get(j) + "");
                  if (j < output2.get(i).size() - 1) {
                      System.out.print(",");
                  }
              }
              System.out.print("]");
              if (i < output2.size() - 1) {
                  System.out.print(",");
              }
          }
          System.out.println("]");


                }
                ###USER_CODE_HERE
            }
        