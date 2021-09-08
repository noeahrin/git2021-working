package constructor;

// Ŭ������ �̸��� Pascal case �� �빮�� �ܾ�� ����
// �ڹٿ��� Ŭ������ �ϳ��� ���� ���α׷�(��ü ���α׷��� �Ϻκ�)
public class Student {

	String name;
	int age;
	int semester;
	String major;

	// �����ε�(Overloading)
	// �̰��� �޼��� �ñ״�ó(method signature)��� ��
	// : �ż��� �̸� + �Ű� ����
	// �ż��� �̸��� �����ϰ� �Ű������� ����, Ÿ��, ������
	// �ٸ� �޼��带 �����ϴ� ��

	// �������� ���α׷����� ������ ������ ������
	// ������(polymorphism) = �پ��� ���¸� ������
	// �޼��� �����ε�
	// = ��ü�� �޼��尡 �پ��� ���¸� ������ ��

	// �Ű������� ���� �⺻ �����ڴ� Ŭ������ �����
	// ������(Constructor)
	// ��ü ������ �ʱ�ȭ ������ ���
	// Ŭ������� ��������(�빮�ڷ� �����ϴ� �ż���)

	// �Ű����� ���� 0��
	Student() {
		// �ƹ��͵� ó�� ����
		// ��ü ������ ��
	}

	// �����ڸ� ���Ƿ� ������, �⺻�����ڴ� ���ŵ�
	// �̸��� ���̸� �Ű������� �޾Ƽ�
	// ��ü(�ν��Ͻ�)�� �����ϴ� ������ �޼���

	// �Ű����� ���� 2��
	Student(String name, int age) {
		// this.�ʵ�
		// ������� ��ü�� �ʵ忡 ����
		this.name = name;
		this.age = age;

		// �̷������� ���ϵ� ������
		// ������ java������ �� ������� �ʴ� ���
//		Student(String _name, int _age) {
//		name = _name;
//		age = _age;
	}

	// �̸�, ����, �б�, �а��ް� �ʵ��ʱ�ȭ �� ��ü ����

	// �Ű����� ���� 4��
	Student(String name, int age, int semester, String major) {
		this.name = name;
		this.age = age;
		this.semester = semester;
		this.major = major;
	}

	void joinCourse() {

	}
}
