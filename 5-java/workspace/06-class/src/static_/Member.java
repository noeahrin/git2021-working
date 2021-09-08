package static_;

public class Member {
	// Member Ŭ���� ��ü���� ��� ����� �� �ִ� ���� ��
	// final ������ �������� ��
	// snake-case: �빮�ڷ�
	final static String SERVICE_NAME = "����� ����";
	// final ������ ���� ��
	static int memberCount = 0;

	String name;
	String id;
	String password;
	int age;

	Member(String name, String id) {
		this.name = name;
		this.id = id;
		memberCount++; // Member ��ü�� ���� �� �� ������Ŵ
	}

	// static�޼���
	// ��ü �������� ȣ���ؼ� ����� �� �ִ� �޼���
	static void printServiceName() {
		// static �������� this ��� �Ұ�
		// this�� ������ ��ü�� ����Ŵ
//		System.out.println(this.serviceName);	// Cannot use this in a static context

		// static ������ ��ü ������ �ƴ� Ŭ��������(�޼������)�� ������
		System.out.println(SERVICE_NAME);
	}

	// static �޼��忡�� non-static �ʵ带 ���� �� ���� -> this.name �� �� �� ����
	static void printNameWithServiceName(String name) {
		System.out.println(SERVICE_NAME + ": " + name);
	}
}
