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

	// �ð�, �õ�, �ñ����� ������ �����͸� �����ؾ���
	// ��) 20210930 16:00, ����, ������ ������ �����ʹ� �����ϰ� 1�� �����ؾ���
	@Id
	private String stdDay;

	@Id
	private String gubun;
	
	// ��
	private Integer defCnt;	// Ȯ���ڼ�
	private Integer isolIngCnt;	// �ݸ��� ȯ�ڼ�
	private Integer overFlowCnt;	// �ؿ����� ��
	private Integer localOccCnt;	// �����߻� ��
}
