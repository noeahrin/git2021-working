package static_;

public class MemberExample {
	public static void main(String[] args) {
		// static �޼��忡 �����ϴ� ����� Ŭ������.�޼����(...)
		Member.printServiceName();

		// �̸�, id�� �Ű������� �޾Ƽ� ��ü ����
		// �ش�Ǵ� �����ڸ� ����
		Member member1 = new Member("ȫ�浿", "hong");
		Member member2 = new Member("���ڹ�", "java");

		System.out.println(Member.SERVICE_NAME + ", �̸�: " + member1.name + ", id: " + member1.id);
		System.out.println(Member.SERVICE_NAME + ", �̸�: " + member2.name + ", id: " + member2.id);

		System.out.println("ȸ����: " + Member.memberCount);
	}
}
