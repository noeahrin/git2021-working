package method;

// 클래스의 이름은 Pascal case 즉 대문자 단어로 시작
// 자바에서 클래스는 하나의 단위 프로그램(전체 프로그램의 일부분)
public class Student {

	String name;
	int age;
	int semester;
	String major;

	Student() {
	}

	// 이름, 나이, 학기, 학과받고 필드초기화 및 객체 생성
	Student(String name, int age, int semester, String major) {
		this.name = name;
		this.age = age;
		this.semester = semester;
		this.major = major;
	}

	// void 반환형식이 없음을 의미함
	// 반환형식 매서드명() {...}
	// 무조건 메서드는 camel-case(소문자시작)

	void printPersonInfo() {
		System.out.println(this.name + " " + this.age);
	}

	// 거의 무조건 데이터를 가져오는 메서드는 get.... 이런 형태
	String getMajorInfo() {
		return this.major + ", 학기: " + this.semester;
	}
}
