package ConditionExample;

public class Exercise03 {
	public static void main(String[] args) {
		
		int a = 100;
			
		int sum = 0;
		for (int i = 1; i <= a / 3; i++) {
			int num = 3 * i;
			sum += num;
		}
		System.out.println("3의 배수의 합:" + sum);
	}
}
