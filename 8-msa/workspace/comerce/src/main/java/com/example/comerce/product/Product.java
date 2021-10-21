package com.example.comerce.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
// 엔티티 모델
public class Product {

	private int id;
	private String productCode;
	private String productName;
	private int unitPrice;

}
