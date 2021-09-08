package method;

public class StydentExample {
	public static void main(String[] args) {

		Student s1 = new Student();
		s1.name = "홀길동";
		s1.age = 20;
		s1.semester = 1;
		s1.major = "컴퓨터공학";
		s1.printPersonInfo();

		// 다른 방법으로 객체 생성
		Student s3 = new Student("서지환", 29, 3, "자바웹");
		System.out.println(s3.name + " " + s3.age);
		s3.printPersonInfo();
		System.out.println(s3.getMajorInfo());
	}

}
