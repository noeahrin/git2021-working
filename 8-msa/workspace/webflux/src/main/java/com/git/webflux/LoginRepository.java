package com.git.webflux;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends ReactiveCrudRepository<Login, Long> {

}