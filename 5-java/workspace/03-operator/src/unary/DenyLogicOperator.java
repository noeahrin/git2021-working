package unary;

public class DenyLogicOperator {
	public static void main(String[] args) {
		boolean play = true;
		System.out.println(play);	// true
		
		play = !play;
		System.out.println(play);	// false
		
		play = !play;
		System.out.println(play);	// true
	}
}
