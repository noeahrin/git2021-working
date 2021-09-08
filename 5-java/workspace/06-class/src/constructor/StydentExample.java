package constructor;

public class StydentExample {
	public static void main(String[] args) {

		// new 클래스명()
		// 클래스명() -> 생성자(Constructor)
		// Student();

		// 생성자는 클래스명과 돌일한 이름의 매서드(함수)를 의미한다
		// 주로 객체를 생성할 때 초기화를 처리함

		// Student.java에 있는 생성자를 주석처리해도 에러가 안남
		// 클래스명() -> 매개변수가 없는 생성자
		// 이거를 기본 생성자라고 함(default constructor)
		// 기본생성자는 선언하지 않아도 클래스에 내장됨

		// new 생성자메서드
		// 생성자 메서드를 실행해서 새로운 객체를 만들고 대입해라

		// Student()라는 생성자 메서드를 샐행해서
		// Student 클래스 형식의 새로운(new) 객체를 만들고
		// Student 클래스 형식의 s1 변수에 대입해라

		// 자바에서는 거의 쓰지 않는 방법
		// 객체를 생성하고 필드에 값을 대입
		Student s1 = new Student();
		s1.name = "홀길동";
		s1.age = 20;

		// 자바에서 객체를 생성하는 한가지 방법
		// 생성자로 필드를 초기화하여 생성
		Student s2 = new Student("존스미스", 21);
		// 이렇게 추가할 수 있긴 한데 잘 안씀
		// s2.name = "John Smith";
		System.out.println(s2.name + " " + s2.age);

		// 다른 방법으로 객체 생성
		Student s3 = new Student("서지환", 29, 3, "자바웹");
		System.out.println(s3.name + " " + s3.age);

	}

}
