package exam;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Scanner;

public class BankApplication {
	// ���¸�� Map ��ü
	// Map<ŰŸ��, ��Ÿ��> ������ = new HashMap<ŰŸ��, ��Ÿ��>();
	private static Map<String, Account> accounts = new LinkedHashMap<String, Account>();
	private static Scanner scanner = new Scanner(System.in);

	public static void main(String[] args) {
		boolean run = true;
		while (run) {
			System.out.println("----------------------------------------------------------");
			System.out.println("1.���»��� | 2.���¸�� | 3.���� | 4.��� | 5.����");
			System.out.println("----------------------------------------------------------");
			System.out.print("����> ");

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
		System.out.println("���α׷� ����");
	}

	// ���»����ϱ�
	private static void createAccount() {
		System.out.println("--------");
		System.out.println("���»���");
		System.out.println("--------");

		System.out.print("���¹�ȣ: ");
		String anoInput = scanner.next();

		System.out.print("������: ");
		String ownerInput = scanner.next();

		System.out.print("�ʱ��Աݾ�: ");
		int balanceInput = scanner.nextInt();

		Account account = new Account(anoInput, ownerInput, balanceInput);
		accounts.put(anoInput, account);

		System.out.println("���: ���°� �����Ǿ����ϴ�.");

	}

	// ���¸�Ϻ���
	private static void accountList() {
		System.out.println("--------");
		System.out.println("���¸��");
		System.out.println("--------");

		for (String id : accounts.keySet()) {

			String ano = accounts.get(id).getAno();
			String owner = accounts.get(id).getOwner();
			int balance = accounts.get(id).getBalance();

			System.out.println(ano + "\t\t" + owner + "\t" + balance);
		}
	}

	// �����ϱ�(�ʵ尪 ����)
	private static void deposit() {
		System.out.println("--------");
		System.out.println("����");
		System.out.println("--------");

		System.out.print("���¹�ȣ: ");
		String anoInput = scanner.next();
		Account deposit = accounts.get(anoInput);

		System.out.print("���ݾ�: ");
		int balance = deposit.getBalance();
		int amount = scanner.nextInt();
		deposit.setBalance(balance + amount);

		System.out.println("������ �����Ǿ����ϴ�.");
	}

	// ����ϱ�(�ʵ尪 ����)
	private static void withdraw() {
		System.out.println("--------");
		System.out.println("���");
		System.out.println("--------");

		System.out.print("���¹�ȣ: ");
		String anoInput = scanner.next();
		Account withdraw = accounts.get(anoInput);

		System.out.print("��ݾ�: ");
		int balance = withdraw.getBalance();
		int amount = scanner.nextInt();
		withdraw.setBalance(balance - amount);

		System.out.println("����� �����Ǿ����ϴ�.");
	}
}