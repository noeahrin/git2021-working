package bianry;

public class StringExample {
	public static void main(String[] args) {
		// 문자열 + 숫자 -> 문자열로 변환
		String str1 = "JDK" + 6.0;
		System.out.println(str1);	// JDK6.0
		
		String str2 = "JDK" + 3 + 3.0;
		String str3 = 3 + 3.0 + "JDK";
		System.out.println(str2);	// JDK33.0
		System.out.println(str3);	// 6.0JDK
		
		String msg = "Hello, Java";
		System.out.println(msg);	// Hello, Java
		
	}

}
