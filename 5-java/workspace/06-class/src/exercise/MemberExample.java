package exercise;

public class MemberExample {
	public static void main(String[] args) {
		// 해당되는 생성자를 선언
		Member member1 = new Member("홍길동", "hong");
		Member member2 = new Member("강자바", "java");
		System.out.println(member1.name + " " + member1.id);
		System.out.println(member2.name + " " + member2.id);
	}
}
