package constructor;

// 클래스의 이름은 Pascal case 즉 대문자 단어로 시작
// 자바에서 클래스는 하나의 단위 프로그램(전체 프로그램의 일부분)
public class Student {

	String name;
	int age;
	int semester;
	String major;

	// 오버로딩(Overloading)
	// 이것을 메서드 시그니처(method signature)라고 함
	// : 매서드 이름 + 매개 변수
	// 매서드 이름은 동일하고 매개변수의 개수, 타입, 순서가
	// 다른 메서드를 선언하는 것

	// 객제지향 프로그래밍의 다형성 원리르 ㄹ가짐
	// 다형성(polymorphism) = 다양한 형태를 가진다
	// 메서드 오버로딩
	// = 객체의 메서드가 다양한 형태를 가지는 것

	// 매개변수가 없는 기본 생성자는 클래스에 내장됨
	// 생성자(Constructor)
	// 객체 생성시 초기화 역할을 담당
	// 클래스명고 ㅏ돌일한(대문자로 시작하는 매서드)

	// 매개변수 개수 0개
	Student() {
		// 아무것도 처리 안함
		// 객체 생성만 함
	}

	// 생성자를 임의로 만들어내면, 기본생성자는 제거됨
	// 이름과 나이를 매개변수로 받아서
	// 객체(인스턴스)를 생성하는 생성자 메서드

	// 매개변수 개수 2개
	Student(String name, int age) {
		// this.필드
		// 만들어질 객체의 필드에 접근
		this.name = name;
		this.age = age;

		// 이런형태의 패턴도 가능함
		// 하지만 java에서는 잘 사용하지 않는 방법
//		Student(String _name, int _age) {
//		name = _name;
//		age = _age;
	}

	// 이름, 나이, 학기, 학과받고 필드초기화 및 객체 생성

	// 매개변수 개수 4개
	Student(String name, int age, int semester, String major) {
		this.name = name;
		this.age = age;
		this.semester = semester;
		this.major = major;
	}

	void joinCourse() {

	}
}
