package ConditionExample;

import java.util.Scanner;

public class Exercise07 {
	public static void main(String[] args) {
		boolean run = true;

		int balance = 0;

		Scanner scanner = new Scanner(System.in);

		while (run) {
			System.out.println("-----------------------------");
			System.out.println("1.예금 | 2.출금 | 3.잔고 | 4.종료");
			System.out.println("-----------------------------");
			System.out.print("선택> ");

			// 입력값을 받음
//			int intInput = scanner.nextInt();
//			int money = 0;						
//			if(intInput == 1) {
//				System.out.println("예금액> ");
//				money = scanner.nextInt();
//				balance += money;
//				
//			} else if(intInput == 2) {
//				System.out.println("출금액> ");
//				money = scanner.nextInt();
//				balance -= money;
//			} else if(intInput == 3) {
//				System.out.println("잔고> "+ balance);				
//			} else {
//				run = false;
//			}	

			// 입력값을 받음
			switch (scanner.nextByte()) {
			// 입력값에 따라서 예금, 출금 또는 잔고 출력 로직 수행
			// 예금일 때
			case 1:
				System.out.print("예금액> ");
				// 입력받은 값을 잔고에 추가
				balance += scanner.nextInt();
				break;
			// 출금일 때
			case 2:
				System.out.print("출금액> ");
				// 입력받은 값을 잔고에서 빼기
				balance -= scanner.nextInt();
				break;
			// 잔고 출력일 때
			case 3:
				System.out.println("잔고> " + balance);
				break;
			// 입력값이 4(종료)일 때는 run false로 나감
			case 4:
				run = false;
				break;

			}

		}

		System.out.println("프로그램 종료");

	}
}
