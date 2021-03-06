package com.git.gateway.auth.filter;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ReactiveStringRedisTemplate;
import org.springframework.data.redis.core.ReactiveValueOperations;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Mono;

@Component
public class SessionFilter implements WebFilter {

	@Autowired
	private ReactiveStringRedisTemplate redis;

	@Override
	public Mono<Void> filter(ServerWebExchange ex, WebFilterChain ch) {
		ServerHttpRequest req = ex.getRequest();

		// 1. 인증 토큰 헤더 정보 가져오기
		List<String> authHeader = req.getHeaders().get("authorization");

		// 2. 인증 토큰 헤더 정보가 있으면
		if (authHeader != null && authHeader.get(0) != null) {
			// 3. 인증 세션에서 토큰값 얻기
			String sessionId = authHeader.get(0).replace("Bearer: ", "");

			// 4. 레디스 <String, String> 처리객체 생성
			ReactiveValueOperations<String, String> record = redis.opsForValue();

			// 5. 토큰 값으로 레디스에 프로필 정보 조회
			Mono<Void> result = record.get(sessionId).flatMap(profileJSON -> {
				System.out.println("-----profileJSON-----");
				System.out.println(profileJSON);
				// 6. 요청 헤더에 session-profile을 넣어줌
				req.mutate().header("session-profile", profileJSON);
				return ch.filter(ex);
			});

			return result;
		}
		return ch.filter(ex);
	}
}
