package ConditionExample;

import java.util.Scanner;

public class Exercise07 {
	public static void main(String[] args) {
		boolean run = true;

		int balance = 0;

		Scanner scanner = new Scanner(System.in);

		while (run) {
			System.out.println("-----------------------------");
			System.out.println("1.���� | 2.��� | 3.�ܰ� | 4.����");
			System.out.println("-----------------------------");
			System.out.print("����> ");

			// �Է°��� ����
//			int intInput = scanner.nextInt();
//			int money = 0;						
//			if(intInput == 1) {
//				System.out.println("���ݾ�> ");
//				money = scanner.nextInt();
//				balance += money;
//				
//			} else if(intInput == 2) {
//				System.out.println("��ݾ�> ");
//				money = scanner.nextInt();
//				balance -= money;
//			} else if(intInput == 3) {
//				System.out.println("�ܰ�> "+ balance);				
//			} else {
//				run = false;
//			}	

			// �Է°��� ����
			switch (scanner.nextByte()) {
			// �Է°��� ���� ����, ��� �Ǵ� �ܰ� ��� ���� ����
			// ������ ��
			case 1:
				System.out.print("���ݾ�> ");
				// �Է¹��� ���� �ܰ��� �߰�
				balance += scanner.nextInt();
				break;
			// ����� ��
			case 2:
				System.out.print("��ݾ�> ");
				// �Է¹��� ���� �ܰ����� ����
				balance -= scanner.nextInt();
				break;
			// �ܰ� ����� ��
			case 3:
				System.out.println("�ܰ�> " + balance);
				break;
			// �Է°��� 4(����)�� ���� run false�� ����
			case 4:
				run = false;
				break;

			}

		}

		System.out.println("���α׷� ����");

	}
}