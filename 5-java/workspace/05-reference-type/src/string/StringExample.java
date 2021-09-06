package string;

public class StringExample {
	public static void main(String[] args) {
		String name1 = "서지환"; // 자바에서는 문자열 쌍따옴표만
		String name2 = "서지환";
		System.out.println(name1 == name2); // true
		System.out.println(name1.equals(name2)); // true

		String name3 = new String("서지환");
		String name4 = new String("서지환");
		// String 동치비교에서 이 방법을 쓰지 말 것
		System.out.println(name3 == name4); // false
		// !! String인 경우 동치 비교에 equal 함수를 사용
		System.out.println(name3.equals(name4)); // true

		// 절대로 사용 하지 말 것
//		if(name3 == "서지환") {
//			
//		}
		// 이것만 사용
//		if(name3.equals("서지환")) {
//			
//		}
	}
}
