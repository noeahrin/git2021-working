package com.git.myworkspace.opendata.covid;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Index;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(indexes = @Index(name = "idx_air_sido_daily_1", columnList = "gubun"))
@IdClass(CovidSidoDailyId.class)
public class CovidSidoDaily {

	// 시간, 시도, 시군구에 유일한 데이터만 존재해야함
	// 예) 20210930 16:00, 서울, 강남구 측정된 데이터는 유일하게 1건 존재해야함
	@Id
	private String stdDay;

	@Id
	private String gubun;
	
	// 값
	private Integer defCnt;	// 확진자수
	private Integer isolIngCnt;	// 격리중 환자수
	private Integer overFlowCnt;	// 해외유입 수
	private Integer localOccCnt;	// 지역발생 수
}
