
// 인터페이스는 클래스의 특수형태
// 구현체는 없고 껍데기만 있음, 구조만 있음
// 1. 설계자가 정의함
public interface Calculator {
	// 추상메서드
	// interface 안에서는 int 하고 {} 이런 내용을 쓸 수 없음
	// 메소드 본체(정의부분)이 없음
	int plus(int a, int b);

	int minus(int a, int b);

	double areaCircle(int r);
}
