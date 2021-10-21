package exam;

public class Account {
	private String ano; // 계좌번호
	private String owner; // 소유자 이름
	private int balance; // 잔고금액

//	Map 여러가지 형태의 Map 가능한 타입(Interface)
//	= HashMap
//	= HashTable
//	= TreeMap
//
//	대입하는 자료구조에 따라서 같은 메서드를 호출하더라도 내부적인 처리방식이 다름

	public Account(String ano, String owner, int balance) {
		this.ano = ano;
		this.owner = owner;
		this.balance = balance;
	}

	public String getAno() {
		return ano;
	}

	public void setAno(String ano) {
		this.ano = ano;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public int getBalance() {
		return balance;
	}

	public void setBalance(int balance) {
		this.balance = balance;
	}
}