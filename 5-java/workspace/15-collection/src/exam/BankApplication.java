package exam;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Scanner;

public class BankApplication {
	// 계좌목록 Map 객체
	// Map<키타입, 값타입> 변수명 = new HashMap<키타입, 값타입>();
	private static Map<String, Account> accounts = new LinkedHashMap<String, Account>();
	private static Scanner scanner = new Scanner(System.in);

	public static void main(String[] args) {
		boolean run = true;
		while (run) {
			System.out.println("----------------------------------------------------------");
			System.out.println("1.계좌생성 | 2.계좌목록 | 3.예금 | 4.출금 | 5.종료");
			System.out.println("----------------------------------------------------------");
			System.out.print("선택> ");

			int selectNo = scanner.nextInt();

			if (selectNo == 1) {
				createAccount();
			} else if (selectNo == 2) {
				accountList();
			} else if (selectNo == 3) {
				deposit();
			} else if (selectNo == 4) {
				withdraw();
			} else if (selectNo == 5) {
				run = false;
			}
		}
		System.out.println("프로그램 종료");
	}

	// 계좌생성하기
	private static void createAccount() {
		System.out.println("--------");
		System.out.println("계좌생성");
		System.out.println("--------");

		System.out.print("게좌번호: ");
		String anoInput = scanner.next();

		System.out.print("게좌주: ");
		String ownerInput = scanner.next();

		System.out.print("초기입금액: ");
		int balanceInput = scanner.nextInt();

		Account account = new Account(anoInput, ownerInput, balanceInput);
		accounts.put(anoInput, account);

		System.out.println("결과: 계좌가 생성되었습니다.");

	}

	// 계좌목록보기
	private static void accountList() {
		System.out.println("--------");
		System.out.println("계좌목록");
		System.out.println("--------");

		for (String id : accounts.keySet()) {

			String ano = accounts.get(id).getAno();
			String owner = accounts.get(id).getOwner();
			int balance = accounts.get(id).getBalance();

			System.out.println(ano + "\t\t" + owner + "\t" + balance);
		}
	}

	// 예금하기(필드값 수정)
	private static void deposit() {
		System.out.println("--------");
		System.out.println("예금");
		System.out.println("--------");

		System.out.print("게좌번호: ");
		String anoInput = scanner.next();
		Account deposit = accounts.get(anoInput);

		System.out.print("예금액: ");
		int balance = deposit.getBalance();
		int amount = scanner.nextInt();
		deposit.setBalance(balance + amount);

		System.out.println("예금이 성공되었습니다.");
	}

	// 출금하기(필드값 수정)
	private static void withdraw() {
		System.out.println("--------");
		System.out.println("출금");
		System.out.println("--------");

		System.out.print("게좌번호: ");
		String anoInput = scanner.next();
		Account withdraw = accounts.get(anoInput);

		System.out.print("출금액: ");
		int balance = withdraw.getBalance();
		int amount = scanner.nextInt();
		withdraw.setBalance(balance - amount);

		System.out.println("출금이 성공되었습니다.");
	}
}