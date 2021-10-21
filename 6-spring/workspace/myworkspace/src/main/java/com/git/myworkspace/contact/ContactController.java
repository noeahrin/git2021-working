package com.git.myworkspace.contact;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactController {
	
	private ContactRepository repo;
	
	// Autowired 어노테이션은 매개변수나 필드 타입에 맞는 객체를
	// Spring에서 생성하여 주입하여줌(의존성 주입, 의존객체주입, DI, Dependency Injection)
	// Repository 인터페이스 구조에 맞는 객체를 Spring에 생성하여 넣어줌
	@Autowired
	public ContactController(ContactRepository repo) {
		this.repo = repo;
	}

	// contact 목록조회
	@GetMapping(value = "/contacts")
	public List<Contact> getContacts() throws InterruptedException {
		return repo.findAll(Sort.by("id").descending());
	}

	@GetMapping("/contacts/paging")
	public Page<Contact> getContactsPaging(@RequestParam int page, @RequestParam int size) {
		return repo.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
	}
	// contact 1건씩 추가
	// POST /contacts {"name":"..."},{"phone":"..."},{"email":"..."}
	@PostMapping(value = "/contacts")
	public Contact addContact(@RequestBody Contact contact, HttpServletResponse res) {
		// 데이터 검증 로직
		// 메모리값(이름, 전화번호, 이메일)이 없으면 에러처리
		if ((contact.getName() == null || contact.getName().isEmpty())
				|| (contact.getPhone() == null || contact.getPhone().isEmpty())) {

			// res.setStatus(400);
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);

			return null;
		}
		// id값 생성
//		Long currentId = maxId.incrementAndGet();

		Contact contactItem = Contact.builder().name(contact.getName()).phone(contact.getPhone())
				.email(contact.getEmail()).memo(contact.getMemo()).createdTime(new Date().getTime()).build();
		
		Contact contactSaved = repo.save(contactItem);
		
		res.setStatus(HttpServletResponse.SC_ACCEPTED);
		
		return contactSaved; 
	}

	@DeleteMapping(value = "/contacts/{id}")
	public boolean removeContact(@PathVariable long id, HttpServletResponse res) throws InterruptedException{
		
		// 만약 해당 id의 데이터가 없으면
		
		Optional<Contact> contact = repo.findById(id);
		if (contact.isEmpty()) {
			// res.setStatus(404); 해당 경로에 리소스가 없음
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			// 그러면 false 리턴
			return false;
		}

		// 데이터가있을때 삭제 수행
		repo.deleteById(id);
		// true 리턴
		return true;
	}

	// contact 1건 수정
	// PUT /contacts/1 {"name":"..."},{"phone":"..."},{"email":"..."}
	// 삭제와 마찬가지로 id값이 path variable로
	@PutMapping(value = "/contacts/{id}")
	public Contact modifyContact(@PathVariable long id, @RequestBody Contact contact, HttpServletResponse res) throws InterruptedException{

		
		// 해당 id의 데이터 1건을 가져옴
		Optional<Contact> contactItem = repo.findById(id);

		// 만약 해당 id의 데이터가 없으면
		if (contactItem.isEmpty()) {
			// res.setStatus(404); 해당 경로에 리소스가 없음
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			// 그러면 빈값이라 null 리턴
			return null;
		}

		// 데이터 검증 로직
		// 메모리값(이름, 전화번호, 이메일)이 없으면 에러처리
		if ((contact.getName() == null || contact.getName().isEmpty())
				|| (contact.getPhone() == null || contact.getPhone().isEmpty())) {
			// res.setStatus(400);
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);

			return null;
		}
		Contact contactToSave = contactItem.get();
		
		contactToSave.setId(contact.getId());
		contactToSave.setName(contact.getName());
		contactToSave.setPhone(contact.getPhone());
		contactToSave.setEmail(contact.getEmail());
		contactToSave.setMemo(contact.getMemo());

		Contact contactSaved = repo.save(contactToSave);

		return contactSaved;
	}

}
