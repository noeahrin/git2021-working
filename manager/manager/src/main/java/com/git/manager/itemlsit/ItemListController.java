package com.git.manager.itemlsit;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ItemListController {

	private ItemListRepository repo;
	
	@Autowired
	public ItemListController(ItemListRepository repo) {
		this.repo = repo;
	}
	
	@GetMapping(value = "/itemlists")
	public List<ItemList> getItemLists() throws InterruptedException {
		return repo.findAll(Sort.by("id").descending());
	}
	
	@GetMapping("/itemLists/paging")
	public Page<ItemList> getItemListsPaging(@RequestParam int page, @RequestParam int size) {
		return repo.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
	}
	
	@PostMapping(value = "/itemlists")
	public ItemList addItemList(@RequestBody ItemList itemlist, HttpServletResponse res) {
		
		if ((itemlist.getCntHave() == null || itemlist.getCntHave().isEmpty())
				|| (itemlist.getCntWant() == null || itemlist.getCntWant().isEmpty())) {
			// res.setStatus(400);
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);

			return null;
	}
		
	ItemList itemlistItem = ItemList.builder().hostName(itemlist.getHostName())
			.crcHave(itemlist.getCrcHave()).cntHave(itemlist.getCntHave())
			.memo(itemlist.getMemo())
			.crcWant(itemlist.getCrcWant()).cntWant(itemlist.getCntWant())
			.bidderName(itemlist.getBidderName()).createdTime(new Date().getTime()).build();
	ItemList itemlistSaved = repo.save(itemlistItem);
				
		res.setStatus(HttpServletResponse.SC_ACCEPTED);
		
		return itemlistSaved;
	}
}
