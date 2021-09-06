package Exercise;

import java.util.Scanner;

public class Exercise09 {
	public static void main(String[] args) {
		boolean run = true;
		int studentNum = 0;
		int[] scores = null;
		Scanner scanner = new Scanner(System.in);

		while (run) {
			System.out.println("---------------------------");
			System.out.println("1.�л��� | 2.�����Է� | 3.��������Ʈ |4.�м� |5.����");
			System.out.println("---------------------------");
			System.out.print("����> ");

			// ���� �Է°��� �ܼ�â���� �Է� ����
			int selectNo = scanner.nextByte();

			switch (selectNo) {
			case 1:
				// �л����� �Է¹���
				System.out.print("�л���> ");
				studentNum += scanner.nextInt();
				// �Է��� �л�����ŭ �迭ũ�⸦ �ʱ�ȭ
				break;
			case 2:
				// �迭ũ�⸸ŭ �ݺ��ؼ� ������ �Է� ����
				scores = new int[studentNum];
				for (int i = 0; i < scores.length; i++) {
					System.out.print("scores[" + i + "]: ");
					scores[i] = scanner.nextInt();
				}
				break;
			case 3:
				// �迭ũ�⸸ū �ݺ��ؼ� ���� ����� ���
				for (int i = 0; i < scores.length; i++) {
					System.out.println("scores[" + i + "]: " + scores[i]);
				}
				break;
			case 4:
				// �ְ������� ��������� ���
				int max = 0;
				double sum = 0.0;

				for (int i = 0; i < scores.length; i++) {
					if (max < scores[i]) {
						max = scores[i];
					}
					sum += scores[i];
				}
				System.out.println("�ְ� ����: " + max);
				System.out.println("��� ����: " + sum / studentNum);
				break;
			case 5:
				// run false�� �ݺ��� Ż��
				run = false;
				break;
			}

		}
		System.out.println("���α׷� ����");
	}
}
