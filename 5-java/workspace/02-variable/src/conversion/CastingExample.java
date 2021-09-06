package conversion;

public class CastingExample {
	public static void main(String[] args) {
		int intValue = 44032;
		// (변환타입) 변수명
		// 원하는 타입으로 변환 가능함
		// 값 손실이 없는 상태,
		// 0 ~ 2^16 -1 까지 저장 가능하기에 문제 없음
		char charValue = (char) intValue;
		System.out.println(charValue);	// 가
		
		double doubleValue = 3.14;
		intValue = (int) doubleValue;
		// 소숫점은 짤림
		System.out.println(intValue);	// 3
	}
}
