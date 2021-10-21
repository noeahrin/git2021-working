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

	// �ֱ� 19���� �����͸� ��ȸ
	// ��) 19�� ��", "");�� ���� �ֱ� �ð��� ������

	// @Cacheable(value = "ĳ���̸�", key = "Ű�̸�")
	// !!ĳ�ô� �޼����� ���� ��ü�� ĳ�õǴ� ����
	@Cacheable(value = cachName, key = "'all'")
	@GetMapping(value = "/sido/current")
	public List<CovidSidoDaily> getAirSidoCurrent() {
		return repo.findAll(PageRequest.of(0, 19, Sort.by("dataTime").descending())).toList();
	}

	// Ư�� ��", "");�� �ֱ� 12���� �����͸� ��ȸ
	// ��) ������", "");, �ֱ� 12��(12�ð�)�� ������
	// ��) WHERE city_name='������", "");' ORDER BY data_time DESC LIMIT 12;

	// spel ǥ���: #city - String city
	// �޼����� �Ű������� ����

	@Cacheable(value = cachName, key = "#gubun")
	@GetMapping(value = "/sido/current/{gubun}")
	public List<CovidSidoDaily> getCovidSidoCurrent(@PathVariable String gubun) {
		Pageable page = PageRequest.of(0, 14, Sort.by("dataTime").descending());
		return repo.findByGubun(page, gubun);
	}
}
