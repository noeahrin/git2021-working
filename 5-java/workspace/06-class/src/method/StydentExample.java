package method;

public class StydentExample {
	public static void main(String[] args) {

		Student s1 = new Student();
		s1.name = "Ȧ�浿";
		s1.age = 20;
		s1.semester = 1;
		s1.major = "��ǻ�Ͱ���";
		s1.printPersonInfo();

		// �ٸ� ������� ��ü ����
		Student s3 = new Student("����ȯ", 29, 3, "�ڹ���");
		System.out.println(s3.name + " " + s3.age);
		s3.printPersonInfo();
		System.out.println(s3.getMajorInfo());
	}

}
