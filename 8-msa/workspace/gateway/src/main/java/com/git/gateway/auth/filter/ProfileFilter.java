package com.git.gateway.auth.filter;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.data.redis.core.ReactiveStringRedisTemplate;
import org.springframework.data.redis.core.ReactiveValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class ProfileFilter implements WebFilter {

	@Autowired
	private ReactiveStringRedisTemplate redis;

	@Override
	public Mono<Void> filter(ServerWebExchange ex, WebFilterChain ch) {
		// 요청 및 응답객체
		ServerHttpRequest req = ex.getRequest();
		ServerHttpResponse res = ex.getResponse();

		// 요청 경로 ex) /auth/signin
		String rootPath = req.getPath().subPath(1, 2).toString(); // auth
		String subPath = req.getPath().subPath(3, 4).toString(); // signin

		if (rootPath.equals("auth") && subPath.equals("profile")) {
			List<String> authHeader = req.getHeaders().get("authorization");

			if (authHeader != null && authHeader.get(0) != null) {
				String sessionId = authHeader.get(0).replace("Bearer: ", "");

				ReactiveValueOperations<String, String> record = redis.opsForValue();

				Mono<Void> result = record.get(sessionId).flatMap(profileJSON -> {
					// 응답처리, sessionId 반환
					res.getHeaders().add("Content-Type", "application/json");
					res.setStatusCode(HttpStatus.OK);
					DataBuffer buffer = res.bufferFactory().wrap(profileJSON.getBytes());

					return res.writeWith(Flux.just(buffer));
				});

				return result;
			}
		}

		return ch.filter(ex);
	}

}
