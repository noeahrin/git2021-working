package com.example.comerce.product;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import com.example.comerce.product.event.SalesProduct;

@Service
public class ProductService {

	@RabbitListener(queues = "sales.product.create3")
	public void receiveSalesProduct(SalesProduct salesProduct) {
		System.out.println(salesProduct);
	}

}
