package classNew;

// 클래스의 이름은 Pascal case 즉 대문자 단어로 시작
// 자바에서 클래스는 하나의 단위 프로그램(전체 프로그램의 일부분)
public class Student {
	// 필드(field) 선언, 자바에선 속성이라고 안함, 따로 있음
	// 클래스 내부의 변수 라고 생각 하면 됨
	// 객체 관점에서는 데이터나 값이 저장되는 부분
	String name; // 이름
	int age; // 나이
	int semester; // 학기
	String major; // 학과

	// 생성자(Constructor)
	// 객체 생성시 초기화 역할을 담당
	Student() {
		// 초기화
	}

	// 매서드(Method)
	// 객체의 기능에 해당하는 함수
	// 기능이라고 생각하면 됨
	void joinCourse() {
		// 수강신청 처리
	}
}
