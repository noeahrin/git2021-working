package string;

public class StringExample {
	public static void main(String[] args) {
		String name1 = "����ȯ"; // �ڹٿ����� ���ڿ� �ֵ���ǥ��
		String name2 = "����ȯ";
		System.out.println(name1 == name2); // true
		System.out.println(name1.equals(name2)); // true

		String name3 = new String("����ȯ");
		String name4 = new String("����ȯ");
		// String ��ġ�񱳿��� �� ����� ���� �� ��
		System.out.println(name3 == name4); // false
		// !! String�� ��� ��ġ �񱳿� equal �Լ��� ���
		System.out.println(name3.equals(name4)); // true

		// ����� ��� ���� �� ��
//		if(name3 == "����ȯ") {
//			
//		}
		// �̰͸� ���
//		if(name3.equals("����ȯ")) {
//			
//		}
	}
}
