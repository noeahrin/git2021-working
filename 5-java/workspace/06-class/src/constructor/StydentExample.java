package constructor;

public class StydentExample {
	public static void main(String[] args) {

		// new Ŭ������()
		// Ŭ������() -> ������(Constructor)
		// Student();

		// �����ڴ� Ŭ������� ������ �̸��� �ż���(�Լ�)�� �ǹ��Ѵ�
		// �ַ� ��ü�� ������ �� �ʱ�ȭ�� ó����

		// Student.java�� �ִ� �����ڸ� �ּ�ó���ص� ������ �ȳ�
		// Ŭ������() -> �Ű������� ���� ������
		// �̰Ÿ� �⺻ �����ڶ�� ��(default constructor)
		// �⺻�����ڴ� �������� �ʾƵ� Ŭ������ �����

		// new �����ڸ޼���
		// ������ �޼��带 �����ؼ� ���ο� ��ü�� ����� �����ض�

		// Student()��� ������ �޼��带 �����ؼ�
		// Student Ŭ���� ������ ���ο�(new) ��ü�� �����
		// Student Ŭ���� ������ s1 ������ �����ض�

		// �ڹٿ����� ���� ���� �ʴ� ���
		// ��ü�� �����ϰ� �ʵ忡 ���� ����
		Student s1 = new Student();
		s1.name = "Ȧ�浿";
		s1.age = 20;

		// �ڹٿ��� ��ü�� �����ϴ� �Ѱ��� ���
		// �����ڷ� �ʵ带 �ʱ�ȭ�Ͽ� ����
		Student s2 = new Student("�����̽�", 21);
		// �̷��� �߰��� �� �ֱ� �ѵ� �� �Ⱦ�
		// s2.name = "John Smith";
		System.out.println(s2.name + " " + s2.age);

		// �ٸ� ������� ��ü ����
		Student s3 = new Student("����ȯ", 29, 3, "�ڹ���");
		System.out.println(s3.name + " " + s3.age);

	}

}
