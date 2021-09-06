package conversion;

public class PromotionExample {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		byte byteValue = 10;			// -128 0 127
		// 값이 손실이 없기 때문에 바로 변환 가능함
		// 즉 작은값에서 큰값으로의 변환은 가능함
		int intValue = byteValue;		// -21억 0 21억 
		System.out.println(intValue);
	}

}
