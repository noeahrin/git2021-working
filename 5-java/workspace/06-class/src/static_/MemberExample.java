package static_;

public class MemberExample {
	public static void main(String[] args) {
		// static 메서드에 접근하는 방법은 클래스명.메서드명(...)
		Member.printServiceName();

		// 이름, id를 매개변수로 받아서 객체 생성
		// 해당되는 생성자를 선언
		Member member1 = new Member("홍길동", "hong");
		Member member2 = new Member("강자바", "java");

		System.out.println(Member.SERVICE_NAME + ", 이름: " + member1.name + ", id: " + member1.id);
		System.out.println(Member.SERVICE_NAME + ", 이름: " + member2.name + ", id: " + member2.id);

		System.out.println("회원수: " + Member.memberCount);
	}
}
