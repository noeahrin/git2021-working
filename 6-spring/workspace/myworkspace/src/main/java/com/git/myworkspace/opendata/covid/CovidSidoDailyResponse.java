package com.git.myworkspace.opendata.covid;

import java.util.List;

import lombok.Data;

@Data
public class CovidSidoDailyResponse {
	private Response response;

	@Data
	public class Response {
		private Header header;
		private Body body;
	}

	@Data
	public class Header {
		private String resultCode;
		private String resultMsg;
	}

	@Data
	public class Body {
		private Items items;
	}

	@Data
	public class Items {
		private List<Item> item;
	}

	@Data
	public class Item {
		// OLAP Cube �������� ������
		// ����, ī�װ�, �ð�, ��
		// https://gccontent.blob.core.windows.net/gccontent/blogs/legacy/c1/2014/11/OLAP_cube-300x257.png
		private String stdDay;
		private String gubun;
		private String incDec;
		private String isolClearCnt;
		private String isolIngCnt;
		private String localOccCnt;
		private String overFlowCnt;
		private String deathCnt;
		private String defCnt;
	}
//	{"response": {
//		  "header": {
//		    "resultCode": "00",
//		    "resultMsg": "NORMAL SERVICE."
//		  },
//		  "body": {
//		    "pageNo": 1,
//		    "totalCount": 19,
//		    "items": {"item": [
//		      {
//		        "defCnt": 6139,
//		        "isolClearCnt": 5942,
//		        "localOccCnt": 0,
//		        "incDec": 11,
//		        "updateDt": null,
//		        "createDt": "2021-10-06 09:56:34.943",
//		        "gubun": "�˿�",
//		        "gubunEn": "Lazaretto",
//		        "deathCnt": 15,
//		        "stdDay": "2021�� 10�� 06�� 00��",
//		        "qurRate": "-",
//		        "overFlowCnt": 11,
//		        "gubunCn": "̰��ϡ",
//		        "isolIngCnt": 182,
//		        "seq": 12530
//		      },

	


}
