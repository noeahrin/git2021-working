package Exercise;

import java.util.Scanner;

public class Exercise09 {
	public static void main(String[] args) {
		boolean run = true;
		int studentNum = 0;
		int[] scores = null;
		Scanner scanner = new Scanner(System.in);

		while (run) {
			System.out.println("---------------------------");
			System.out.println("1.학생수 | 2.점수입력 | 3.점수리스트 |4.분석 |5.종료");
			System.out.println("---------------------------");
			System.out.print("선택> ");

			// 숫자 입력값을 콘솔창에서 입력 받음
			int selectNo = scanner.nextByte();

			switch (selectNo) {
			case 1:
				// 학생수를 입력받음
				System.out.print("학생수> ");
				studentNum += scanner.nextInt();
				// 입력한 학생수만큼 배열크기를 초기화
				break;
			case 2:
				// 배열크기만큼 반복해서 점수를 입력 받음
				scores = new int[studentNum];
				for (int i = 0; i < scores.length; i++) {
					System.out.print("scores[" + i + "]: ");
					scores[i] = scanner.nextInt();
				}
				break;
			case 3:
				// 배열크기만큰 반복해서 점수 목록을 출력
				for (int i = 0; i < scores.length; i++) {
					System.out.println("scores[" + i + "]: " + scores[i]);
				}
				break;
			case 4:
				// 최고점수와 평균점수를 출력
				int max = 0;
				double sum = 0.0;

				for (int i = 0; i < scores.length; i++) {
					if (max < scores[i]) {
						max = scores[i];
					}
					sum += scores[i];
				}
				System.out.println("최고 점수: " + max);
				System.out.println("평균 점수: " + sum / studentNum);
				break;
			case 5:
				// run false로 반복문 탈출
				run = false;
				break;
			}

		}
		System.out.println("프로그램 종료");
	}
}
