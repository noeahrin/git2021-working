
// 2. �������̽� �԰ݿ� �°� ��� Ŭ������ ����
// ���Ŭ������ ���� �۵��� �ƴϰ� ������ �ȳ��� ��¥���� ó���ǰ� ��

// implement: ����
// ����Ŭ������ implements �������̽���
public class CalculatorMock implements Calculator {

	@Override
	public int plus(int a, int b) {
		// TODO Auto-generated method stub
		return a + b;
	}

	@Override
	public int minus(int a, int b) {
		// TODO Auto-generated method stub
		return a - b;
	}

	@Override
	public double areaCircle(int r) {
		// TODO Auto-generated method stub
		return r * r * 3.14;
	}

}
