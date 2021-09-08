package exercise;

public class AccoutExample {
	public static void main(String[] args) {

		// �׽�Ʈ ���̽�(test case) -> �ڵ�� ¥�� -> �׽�Ʈ �ڵ��� ��
		// ���� �׽�Ʈ���� ���� -> ��� �ڵ��� �޼��带 �׽�Ʈ�ϴ� ��

		// �׽�Ʈ ���̽� ����
		// event-flow: �ܰ��(balance)�� �ܰ��� ����
		// 0 ~ 100�� ������ ���� �������� ���� �ܰ�׿� ��ȭ�� �������
		// �� ���� ���� �������� ���� �ܰ���� ����

		// given - �׽�Ʈ ȯ�� �غ�(�׽�Ʈ�� ������, �׽�Ʈ�� ��ü)
		Account account = new Account(); // �׽�Ʈ�� ��ü
		int[] testValues = { 10000, -100, 2000000, 300000 }; // �׽�Ʈ�� ������

		// when - �׽�Ʈ �����ͷ� �׽�Ʈ ���̽� ����
		account.setBalance(testValues[0]);

		int expectedValue = testValues[0];
		// then - ������(expected result)�� �������(actual result)�� ��
		// ������: 10000
		if (account.getBalance() == expectedValue) {
			System.out.println("���̽� ��� - pass");
		} else {
			System.out.println("���̽� ���� -fail");
		}
		System.out.println("���� �ܰ�: " + account.getBalance()); // ���� �ܰ�: 10000

		// ��������

		// when - �׽�Ʈ �����ͷ� �׽�Ʈ ���̽� ����
		account.setBalance(testValues[1]);

		expectedValue = account.getBalance();
		// then - ���������� ���� ����� ��
		if (account.getBalance() == expectedValue) {
			System.out.println("���̽� ��� - pass");
		} else {
			System.out.println("���̽� ���� -fail");
		}
		System.out.println("���� �ܰ�: " + account.getBalance()); // ���� �ܰ�: 10000

		account.setBalance(testValues[2]);
		expectedValue = account.getBalance();
		if (account.getBalance() == expectedValue) {
			System.out.println("���̽� ��� - pass");
		} else {
			System.out.println("���̽� ���� -fail");
		}
		System.out.println("���� �ܰ�: " + account.getBalance()); // ���� �ܰ�: 10000

		account.setBalance(testValues[3]);
		expectedValue = account.getBalance();
		if (account.getBalance() == expectedValue) {
			System.out.println("���̽� ��� - pass");
		} else {
			System.out.println("���̽� ���� -fail");
		}
		System.out.println("���� �ܰ�: " + account.getBalance()); // ���� �ܰ�: 300000
	}
}
