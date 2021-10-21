package exercise.q4;

public class DaoExample {

	public static void dbWrok(DataAccessObject dao) {
		dao.select();
		dao.insert();
		dao.update();
		dao.delete();
	}

	public static void main(String[] args) {

		dbWrok(new OracleDao());
		dbWrok(new MySqlDao());
	}
}
