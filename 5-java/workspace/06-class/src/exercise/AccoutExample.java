package exercise;

public class AccoutExample {
	public static void main(String[] args) {

		// 테스트 케이스(test case) -> 코드로 짜면 -> 테스트 코드라고 함
		// 단위 테스트에서 수행 -> 대상 코드의 메서드를 테스트하는 것

		// 테스트 케이스 내용
		// event-flow: 잔고액(balance)에 잔고값을 대입
		// 0 ~ 100만 사이의 값을 대입했을 때는 잔고액에 변화가 없어야함
		// 그 외의 값을 대입했을 때는 잔고액이 변경

		// given - 테스트 환경 준비(테스트용 데이터, 테스트용 객체)
		Account account = new Account(); // 테스트용 객체
		int[] testValues = { 10000, -100, 2000000, 300000 }; // 테스트용 데이터

		// when - 테스트 데이터로 테스트 케이스 실행
		account.setBalance(testValues[0]);

		int expectedValue = testValues[0];
		// then - 예상결과(expected result)와 실제결과(actual result)를 비교
		// 예상결과: 10000
		if (account.getBalance() == expectedValue) {
			System.out.println("케이스 통과 - pass");
		} else {
			System.out.println("케이스 실패 -fail");
		}
		System.out.println("현재 잔고: " + account.getBalance()); // 현재 잔고: 10000

		// 예상결과값

		// when - 테스트 데이터로 테스트 케이스 실행
		account.setBalance(testValues[1]);

		expectedValue = account.getBalance();
		// then - 예상결과값과 실제 결과를 비교
		if (account.getBalance() == expectedValue) {
			System.out.println("케이스 통과 - pass");
		} else {
			System.out.println("케이스 실패 -fail");
		}
		System.out.println("현재 잔고: " + account.getBalance()); // 현재 잔고: 10000

		account.setBalance(testValues[2]);
		expectedValue = account.getBalance();
		if (account.getBalance() == expectedValue) {
			System.out.println("케이스 통과 - pass");
		} else {
			System.out.println("케이스 실패 -fail");
		}
		System.out.println("현재 잔고: " + account.getBalance()); // 현재 잔고: 10000

		account.setBalance(testValues[3]);
		expectedValue = account.getBalance();
		if (account.getBalance() == expectedValue) {
			System.out.println("케이스 통과 - pass");
		} else {
			System.out.println("케이스 실패 -fail");
		}
		System.out.println("현재 잔고: " + account.getBalance()); // 현재 잔고: 300000
	}
}
