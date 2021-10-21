package com.git.myworkspace.opendata.covid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Component("covidController")
@RestController
@RequestMapping(value = "/opendata/covid")
public class CovidController {
	private CovidSidoDailyRepository repo;
	private final String cachName = "covid-current";

	@Autowired
	public CovidController(CovidSidoDailyRepository repo) {
		this.repo = repo;
	}

	// 최근 19개의 데이터를 조회
	// 예) 19개 구", "");의 가장 최근 시간의 데이터

	// @Cacheable(value = "캐시이름", key = "키이름")
	// !!캐시는 메서드의 리턴 객체가 캐시되는 것임
	@Cacheable(value = cachName, key = "'all'")
	@GetMapping(value = "/sido/current")
	public List<CovidSidoDaily> getAirSidoCurrent() {
		return repo.findAll(PageRequest.of(0, 19, Sort.by("dataTime").descending())).toList();
	}

	// 특정 구", "");의 최근 12개의 데이터를 조회
	// 예) 강남구", "");, 최근 12개(12시간)의 데이터
	// 예) WHERE city_name='강남구", "");' ORDER BY data_time DESC LIMIT 12;

	// spel 표기법: #city - String city
	// 메서드의 매개변수와 연결

	@Cacheable(value = cachName, key = "#gubun")
	@GetMapping(value = "/sido/current/{gubun}")
	public List<CovidSidoDaily> getCovidSidoCurrent(@PathVariable String gubun) {
		Pageable page = PageRequest.of(0, 14, Sort.by("dataTime").descending());
		return repo.findByGubun(page, gubun);
	}
}
