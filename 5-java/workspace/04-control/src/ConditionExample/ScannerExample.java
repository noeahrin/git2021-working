package ConditionExample;

import java.util.Scanner;

public class ScannerExample {
	public static void main(String[] args) {
		// Scanner ���� ���콺 Ŀ���� �ø��� ctrl + l -> quick fix
		// java.util.Scanner
		Scanner scanner = new Scanner(System.in);
		System.out.println("--�Է°��� �Է��ϼ���.--");
		System.out.println(">");
		
		String input = "";
		input = scanner.next();	// ���ڿ� ���� �Է� ���� �� ����
		
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
