

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

// 서비스 컴포넌트
// 1. 외부 시스템 통신
// 2. 데이터 트랜잭션 처리
@Service
public class CovidService {

	private final String SERVICE_KEY = "XqwM0y6GKOhSY3aA%2B3xwNB1nj0bQz%2FrPUQOJguSpaCBkH3zw78JUhcz5bkK8tlnu1IVIcCAiJbYCpO12%2FPT%2FyQ%3D%3D";

	private CovidSidoDailyRepository repo;

	@Autowired
	public CovidService(CovidSidoDailyRepository repo) {
		this.repo = repo;
	}

	// 시군구별 대기질 시간단위 조회

	// 정각 2시간마다 실행
//	@Scheduled(cron = "0 0 */2 * * *")	

	// 매시 30분에 실행, 1시 30분, 2시 30분
	// 그 시간이 되어야만 실행됨
	// cron="초 분 시 일 월 년"
	// cron="0 30 * * * *"
//	@Scheduled(cron = "0 30 * * * *")

	// 1일마다 실행(js, setInterval)
	// fixedRate: 가장 처음에 실행되고 간격별로 실행됨
	@Scheduled(fixedRate = 1000 * 60 * 60 * 24)
	public void requestCovid() throws IOException {
		String[] gubuns = { "서울", "경기" };
		for (String gubun : gubuns) {
			requestCovidSidoDaily(gubun);
		}
	}

	@SuppressWarnings("deprecation")
	public void requestCovidSidoDaily(String sido) throws IOException {
		System.out.println(new Date().toLocaleString());

		/* ---------------------- 데이터 요청하고 XML 받아오기 시작 ----------------- */
		// http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=XqwM0y6GKOhSY3aA%2B3xwNB1nj0bQz%2FrPUQOJguSpaCBkH3zw78JUhcz5bkK8tlnu1IVIcCAiJbYCpO12%2FPT%2FyQ%3D%3D
		// StringBuilder 문자열을 빌더방식으로 생성하는 클래스
		// 1. 요청 URL 만들기
		// 문자열을 빌더형식으로 생성하는 클래스
		StringBuilder builder = new StringBuilder();
		builder.append("http://openapi.data.go.kr/openapi"); // 호스트/게이트웨이
		builder.append("/service/rest/Covid19"); // 서비스
		builder.append("/getCovid19SidoInfStateJson"); // 기능(코로나19시도발생_현황 조회 서비스)
//		builder.append("?sidoName=" + URLEncoder.encode(sido, "UTF-8")); // 시도(서울, 경기...)
//		builder.append("&searchCondition=DAILY"); // 1시간단위
		builder.append("?serviceKey=" + SERVICE_KEY); // 서비스키
		builder.append("&pageNo=1&numOfRows=10"); // 시군구 개수
		

		System.out.println(builder.toString());

		// 2. URL 객체 생성
		URL url = new URL(builder.toString());

		// 3. Http 접속 생성
		HttpURLConnection con = (HttpURLConnection) url.openConnection();

		// 4. byte[]배열로 데이터를 읽어옴
		byte[] result = con.getInputStream().readAllBytes();

		// 5. byte[] -> 문자열(XML) 변환
		String data = new String(result, "UTF-8");
		System.out.println(data);
		/* ---------------------- 데이터 요청하고 XML 받아오기 끝 ----------------- */

		/* ---------------------- XML -> JSON -> Object(Java) 시작 ----------------- */
		// XML(문자열) -> JSON(문자열)
		String json = XML.toJSONObject(data).toString(2);
		System.out.println(json);

		// JSON(문자열) -> Java(object)
		CovidSidoDailyResponse response = new Gson().fromJson(json, CovidSidoDailyResponse.class);
		System.out.println(response);

//		// 강동구 데이터
//		AirSigunguDailyResponse.Item item = response.getResponse().getBody().getItems().getItem().get(1);
//		System.out.println(item);
		/* ---------------------- XML -> JSON -> Object(Java) 끝 ----------------- */

		/* ---------------------- 응답 객체 -> 엔티티 시작 ----------------- */
		List<CovidSidoDaily> list = new ArrayList<CovidSidoDaily>();
		for (CovidSidoDailyResponse.Item item : response.getResponse().getBody().getItems().getItem()) {
			CovidSidoDaily record = CovidSidoDaily.builder().stdDay(item.getStdDay()).gubun(item.getGubun())
					.defCnt(item.getDefCnt().isEmpty() ? null : Integer.valueOf(item.getDefCnt()))
					.isolIngCnt(item.getIsolIngCnt().isEmpty() ? null : Integer.valueOf(item.getIsolIngCnt()))
					.overFlowCnt(item.getOverFlowCnt().isEmpty() ? null : Integer.valueOf(item.getOverFlowCnt()))
					.localOccCnt(item.getLocalOccCnt().isEmpty() ? null : Integer.valueOf(item.getLocalOccCnt())).build();

			list.add(record);
		}
		/* ---------------------- 응답 객체 -> 엔티티 끝 ----------------- */

		/* ---------------------- 엔티티객체 -> 리포지터리로 저장 시작 ----------------- */
		repo.saveAll(list);
		/* ---------------------- 엔티티객체 -> 리포지터리로 저장 끝 ----------------- */
	}
}
