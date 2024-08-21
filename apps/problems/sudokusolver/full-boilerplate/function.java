
            public class Main {
                public static void main(String[] args) {
                    char[][] board1 = {{'5','3','.','.','7','.','.','.','.'},{'6','.','.','1','9','5','.','.','.'},{'.','9','8','.','.','.','.','6','.'},{'8','.','.','.','6','.','.','.','3'},{'4','.','.','8','.','3','.','.','1'},{'7','.','.','.','2','.','.','.','6'},{'.','6','.','.','.','.','2','8','.'},{'.','.','.','4','.','.','.','.','5'},{'.','.','.','.','8','.','.','7','9'}};
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
 char[][] board2 = {{'5','3','.','.','7','.','.','.','.'},{'6','.','.','1','9','5','.','.','.'},{'.','9','8','.','.','.','.','6','.'},{'8','.','.','.','6','.','.','.','3'},{'4','.','.','8','.','3','.','.','1'},{'7','.','.','.','2','.','.','.','6'},{'.','6','.','.','.','.','2','8','.'},{'.','.','.','4','.','.','.','.','5'},{'.','.','.','.','8','.','.','7','9'}};
char[][] output2 = solveSudoku(board2);
 System.out.print("[");
          for (int i = 0; i < output2.length; i++) {
              System.out.print("[");
              for (int j = 0; j < output2[i].length; j++) {
                  System.out.print("'" + output2[i][j] + "'");
                  if (j < output2[i].length - 1) {
                      System.out.print(",");
                  }
              }
              System.out.print("]");
              if (i < output2.length - 1) {
                  System.out.print(",");
              }
          }
          System.out.println("]");


                }
                ###USER_CODE_HERE
            }
        