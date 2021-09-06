package condition;

public class IfExample {
	public static void main(String[] args) {
		String empty = "";
		
		// Java에서는 허용 안됨
//		if(empty) {
//	    }
		
		// boolean 값이 나오는 연산만 if문의 조건식으로 올 수 있음
		int a = 10;
		if(a > 9) {
			System.out.println(a);
		}
		if(true) {
			System.out.println(a);
		}
	}
}
