
            public class Main {
                public static void main(String[] args) {
                    char[][] board1 = {{'5','3','4','6','7','8','9','1','2'},{'6','7','2','1','9','5','3','4','8'},{'1','9','8','3','4','2','5','6','7'},{'8','5','9','7','6','1','4','2','3'},{'4','2','6','8','5','3','7','9','1'},{'7','1','3','9','2','4','8','5','6'},{'9','6','1','5','3','7','2','8','4'},{'2','8','7','4','1','9','6','3','5'},{'3','4','5','2','8','6','1','7','9'}};
char[][] output1 = solveSudoku(board1);
 System.out.print("[");
          for (int i = 0; i < output1.length; i++) {
              System.out.print("[");
              for (int j = 0; j < output1[i].length; j++) {
                  System.out.print("'" + output1[i][j] + "'");
                  if (j < output1[i].length - 1) {
                      System.out.print(",");
                  }
              }
              System.out.print("]");
              if (i < output1.length - 1) {
                  System.out.print(",");
              }
          }
          System.out.println("]");


                }
                ###USER_CODE_HERE
            }
        