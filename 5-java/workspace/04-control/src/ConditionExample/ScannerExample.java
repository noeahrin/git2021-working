package ConditionExample;

import java.util.Scanner;

public class ScannerExample {
	public static void main(String[] args) {
		// Scanner 위에 마우스 커서를 올리고 ctrl + l -> quick fix
		// java.util.Scanner
		Scanner scanner = new Scanner(System.in);
		System.out.println("--입력값을 입력하세요.--");
		System.out.println(">");
		
		String input = "";
		input = scanner.next();	// 문자열 값을 입력 받을 수 있음
		
		int num = 0;
		int amount = 0;
		
		System.out.println(input);
		String a = "";
		a = input;
		System.out.println(a);
		if(a == "1") {
			System.out.println("aaaaaa");
		}
	}
}
