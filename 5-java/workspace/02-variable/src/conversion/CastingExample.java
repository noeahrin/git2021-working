package conversion;

public class CastingExample {
	public static void main(String[] args) {
		int intValue = 44032;
		// (��ȯŸ��) ������
		// ���ϴ� Ÿ������ ��ȯ ������
		// �� �ս��� ���� ����,
		// 0 ~ 2^16 -1 ���� ���� �����ϱ⿡ ���� ����
		char charValue = (char) intValue;
		System.out.println(charValue);	// ��
		
		double doubleValue = 3.14;
		intValue = (int) doubleValue;
		// �Ҽ����� ©��
		System.out.println(intValue);	// 3
	}
}
