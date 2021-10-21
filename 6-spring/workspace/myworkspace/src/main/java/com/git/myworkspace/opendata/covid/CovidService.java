

//http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=XqwM0y6GKOhSY3aA%2B3xwNB1nj0bQz%2FrPUQOJguSpaCBkH3zw78JUhcz5bkK8tlnu1IVIcCAiJbYCpO12%2FPT%2FyQ%3D%3D&pageNo=1&numOfRows=10&startCreateDt=20200410&endCreateDt=20200410

package com.git.myworkspace.opendata.covid;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

// ���� ������Ʈ
// 1. �ܺ� �ý��� ���
// 2. ������ Ʈ����� ó��
@Service
public class CovidService {

	private final String SERVICE_KEY = "XqwM0y6GKOhSY3aA%2B3xwNB1nj0bQz%2FrPUQOJguSpaCBkH3zw78JUhcz5bkK8tlnu1IVIcCAiJbYCpO12%2FPT%2FyQ%3D%3D";

	private CovidSidoDailyRepository repo;

	@Autowired
	public CovidService(CovidSidoDailyRepository repo) {
		this.repo = repo;
	}

	// �ñ����� ����� �ð����� ��ȸ

	// ���� 2�ð����� ����
//	@Scheduled(cron = "0 0 */2 * * *")	

	// �Ž� 30�п� ����, 1�� 30��, 2�� 30��
	// �� �ð��� �Ǿ�߸� �����
	// cron="�� �� �� �� �� ��"
	// cron="0 30 * * * *"
//	@Scheduled(cron = "0 30 * * * *")

	// 1�ϸ��� ����(js, setInterval)
	// fixedRate: ���� ó���� ����ǰ� ���ݺ��� �����
	@Scheduled(fixedRate = 1000 * 60 * 60 * 24)
	public void requestCovid() throws IOException {
		String[] gubuns = { "����", "���" };
		for (String gubun : gubuns) {
			requestCovidSidoDaily(gubun);
		}
	}

	@SuppressWarnings("deprecation")
	public void requestCovidSidoDaily(String sido) throws IOException {
		System.out.println(new Date().toLocaleString());

		/* ---------------------- ������ ��û�ϰ� XML �޾ƿ��� ���� ----------------- */
		// http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=XqwM0y6GKOhSY3aA%2B3xwNB1nj0bQz%2FrPUQOJguSpaCBkH3zw78JUhcz5bkK8tlnu1IVIcCAiJbYCpO12%2FPT%2FyQ%3D%3D
		// StringBuilder ���ڿ��� ����������� �����ϴ� Ŭ����
		// 1. ��û URL �����
		// ���ڿ��� ������������ �����ϴ� Ŭ����
		StringBuilder builder = new StringBuilder();
		builder.append("http://openapi.data.go.kr/openapi"); // ȣ��Ʈ/����Ʈ����
		builder.append("/service/rest/Covid19"); // ����
		builder.append("/getCovid19SidoInfStateJson"); // ���(�ڷγ�19�õ��߻�_��Ȳ ��ȸ ����)
//		builder.append("?sidoName=" + URLEncoder.encode(sido, "UTF-8")); // �õ�(����, ���...)
//		builder.append("&searchCondition=DAILY"); // 1�ð�����
		builder.append("?serviceKey=" + SERVICE_KEY); // ����Ű
		builder.append("&pageNo=1&numOfRows=10"); // �ñ��� ����
		

		System.out.println(builder.toString());

		// 2. URL ��ü ����
		URL url = new URL(builder.toString());

		// 3. Http ���� ����
		HttpURLConnection con = (HttpURLConnection) url.openConnection();

		// 4. byte[]�迭�� �����͸� �о��
		byte[] result = con.getInputStream().readAllBytes();

		// 5. byte[] -> ���ڿ�(XML) ��ȯ
		String data = new String(result, "UTF-8");
		System.out.println(data);
		/* ---------------------- ������ ��û�ϰ� XML �޾ƿ��� �� ----------------- */

		/* ---------------------- XML -> JSON -> Object(Java) ���� ----------------- */
		// XML(���ڿ�) -> JSON(���ڿ�)
		String json = XML.toJSONObject(data).toString(2);
		System.out.println(json);

		// JSON(���ڿ�) -> Java(object)
		CovidSidoDailyResponse response = new Gson().fromJson(json, CovidSidoDailyResponse.class);
		System.out.println(response);

//		// ������ ������
//		AirSigunguDailyResponse.Item item = response.getResponse().getBody().getItems().getItem().get(1);
//		System.out.println(item);
		/* ---------------------- XML -> JSON -> Object(Java) �� ----------------- */

		/* ---------------------- ���� ��ü -> ��ƼƼ ���� ----------------- */
		List<CovidSidoDaily> list = new ArrayList<CovidSidoDaily>();
		for (CovidSidoDailyResponse.Item item : response.getResponse().getBody().getItems().getItem()) {
			CovidSidoDaily record = CovidSidoDaily.builder().stdDay(item.getStdDay()).gubun(item.getGubun())
					.defCnt(item.getDefCnt().isEmpty() ? null : Integer.valueOf(item.getDefCnt()))
					.isolIngCnt(item.getIsolIngCnt().isEmpty() ? null : Integer.valueOf(item.getIsolIngCnt()))
					.overFlowCnt(item.getOverFlowCnt().isEmpty() ? null : Integer.valueOf(item.getOverFlowCnt()))
					.localOccCnt(item.getLocalOccCnt().isEmpty() ? null : Integer.valueOf(item.getLocalOccCnt())).build();

			list.add(record);
		}
		/* ---------------------- ���� ��ü -> ��ƼƼ �� ----------------- */

		/* ---------------------- ��ƼƼ��ü -> �������͸��� ���� ���� ----------------- */
		repo.saveAll(list);
		/* ---------------------- ��ƼƼ��ü -> �������͸��� ���� �� ----------------- */
	}
}
