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
	
	// Autowired ������̼��� �Ű������� �ʵ� Ÿ�Կ� �´� ��ü��
	// Spring���� �����Ͽ� �����Ͽ���(������ ����, ������ü����, DI, Dependency Injection)
	// Repository �������̽� ������ �´� ��ü�� Spring�� �����Ͽ� �־���
	@Autowired
	public ContactController(ContactRepository repo) {
		this.repo = repo;
	}

	// contact �����ȸ
	@GetMapping(value = "/contacts")
	public List<Contact> getContacts() throws InterruptedException {
		return repo.findAll(Sort.by("id").descending());
	}

	@GetMapping("/contacts/paging")
	public Page<Contact> getContactsPaging(@RequestParam int page, @RequestParam int size) {
		return repo.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
	}
	// contact 1�Ǿ� �߰�
	// POST /contacts {"name":"..."},{"phone":"..."},{"email":"..."}
	@PostMapping(value = "/contacts")
	public Contact addContact(@RequestBody Contact contact, HttpServletResponse res) {
		// ������ ���� ����
		// �޸𸮰�(�̸�, ��ȭ��ȣ, �̸���)�� ������ ����ó��
		if ((contact.getName() == null || contact.getName().isEmpty())
				|| (contact.getPhone() == null || contact.getPhone().isEmpty())) {

			// res.setStatus(400);
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);

			return null;
		}
		// id�� ����
//		Long currentId = maxId.incrementAndGet();

		Contact contactItem = Contact.builder().name(contact.getName()).phone(contact.getPhone())
				.email(contact.getEmail()).memo(contact.getMemo()).createdTime(new Date().getTime()).build();
		
		Contact contactSaved = repo.save(contactItem);
		
		res.setStatus(HttpServletResponse.SC_ACCEPTED);
		
		return contactSaved; 
	}

	@DeleteMapping(value = "/contacts/{id}")
	public boolean removeContact(@PathVariable long id, HttpServletResponse res) throws InterruptedException{
		
		// ���� �ش� id�� �����Ͱ� ������
		
		Optional<Contact> contact = repo.findById(id);
		if (contact.isEmpty()) {
			// res.setStatus(404); �ش� ��ο� ���ҽ��� ����
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			// �׷��� false ����
			return false;
		}

		// �����Ͱ������� ���� ����
		repo.deleteById(id);
		// true ����
		return true;
	}

	// contact 1�� ����
	// PUT /contacts/1 {"name":"..."},{"phone":"..."},{"email":"..."}
	// ������ ���������� id���� path variable��
	@PutMapping(value = "/contacts/{id}")
	public Contact modifyContact(@PathVariable long id, @RequestBody Contact contact, HttpServletResponse res) throws InterruptedException{

		
		// �ش� id�� ������ 1���� ������
		Optional<Contact> contactItem = repo.findById(id);

		// ���� �ش� id�� �����Ͱ� ������
		if (contactItem.isEmpty()) {
			// res.setStatus(404); �ش� ��ο� ���ҽ��� ����
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			// �׷��� ���̶� null ����
			return null;
		}

		// ������ ���� ����
		// �޸𸮰�(�̸�, ��ȭ��ȣ, �̸���)�� ������ ����ó��
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
