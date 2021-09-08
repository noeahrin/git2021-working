package method;

// Ŭ������ �̸��� Pascal case �� �빮�� �ܾ�� ����
// �ڹٿ��� Ŭ������ �ϳ��� ���� ���α׷�(��ü ���α׷��� �Ϻκ�)
public class Student {

	String name;
	int age;
	int semester;
	String major;

	Student() {
	}

	// �̸�, ����, �б�, �а��ް� �ʵ��ʱ�ȭ �� ��ü ����
	Student(String name, int age, int semester, String major) {
		this.name = name;
		this.age = age;
		this.semester = semester;
		this.major = major;
	}

	// void ��ȯ������ ������ �ǹ���
	// ��ȯ���� �ż����() {...}
	// ������ �޼���� camel-case(�ҹ��ڽ���)

	void printPersonInfo() {
		System.out.println(this.name + " " + this.age);
	}

	// ���� ������ �����͸� �������� �޼���� get.... �̷� ����
	String getMajorInfo() {
		return this.major + ", �б�: " + this.semester;
	}
}
