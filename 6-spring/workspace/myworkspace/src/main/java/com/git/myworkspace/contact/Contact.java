package com.git.myworkspace.contact;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

//Spring Data JPA(Java Persistence API, �ڹ� ����ȭ API)
//����ȭ: �ֹ߼� ������ -> ���ֹ߼� ��ġ
//        �ڹ� ��ü(RAM) -> ���̺� ���ڵ�(���ϳ����� Ư����)

//ORM(Object Relational Mapping)
//: ��ü�� ���̺�� ������ �� ����
//1. ��ü �������� ������ �� �ְ���(����Ʈ�������)
//2. Ư�� DB�� ���ӵ��� �ʰ���

//@Entity: ���̺�� Ŭ������ ������
//�⺻����� Photo(pascal-case) -> photo(snake-case)

@Entity
public class Contact {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(columnDefinition = "VARCHAR(1000)")
	private String memo;
	// BLOB: binary large object
	@Column(columnDefinition = "TEXT")
	private String name;
	private String phone;
	private String email;
	private long createdTime;

}