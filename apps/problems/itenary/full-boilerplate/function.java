
            public class Main {
                public static void main(String[] args) {
                    List<List<String>> tickets1 = Arrays.asList(
          Arrays.asList("MUC", "LHR"),
  Arrays.asList("JFK", "MUC"),
  Arrays.asList("SFO", "SJC"),
  Arrays.asList("LHR", "SFO")
        );
List<String> output1 = findItinerary(tickets1);

         System.out.print("[");
          for (int i = 0; i < output1.size(); i++) {
               System.out.print("\"" + output1.get(i) + "\"");
              if (i < output1.size() - 1) {
                  System.out.print(", ");
              }
          }
          System.out.println("]");
 List<List<String>> tickets2 = Arrays.asList(
          Arrays.asList("JFK", "SFO"),
  Arrays.asList("JFK", "ATL"),
  Arrays.asList("SFO", "ATL"),
  Arrays.asList("ATL", "JFK"),
  Arrays.asList("ATL", "SFO")
        );
List<String> output2 = findItinerary(tickets2);

         System.out.print("[");
          for (int i = 0; i < output2.size(); i++) {
               System.out.print("\"" + output2.get(i) + "\"");
              if (i < output2.size() - 1) {
                  System.out.print(", ");
              }
          }
          System.out.println("]");


                }
                ###USER_CODE_HERE
            }
        