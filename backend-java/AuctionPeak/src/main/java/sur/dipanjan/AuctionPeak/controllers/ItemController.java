package sur.dipanjan.AuctionPeak.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sur.dipanjan.AuctionPeak.entities.Item;
import sur.dipanjan.AuctionPeak.models.ItemCreateRequest;
import sur.dipanjan.AuctionPeak.models.ItemUpdateRequest;
import sur.dipanjan.AuctionPeak.services.ItemService;
import sur.dipanjan.AuctionPeak.services.customExceptions.NotFoundError;

import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping
    public List<Item> getAllItems(@RequestParam(required = false) String query) {
        List<Item> items = itemService.getAllItems(query);
        if (items == null) {
            throw new NotFoundError("No items found");
        }
        return items;
    }

    @GetMapping("/{itemId}")
    @PreAuthorize("@ItemSecurity.isOwnerorAdminorAuctionCreatorORParticipantBYItemId(authentication, #itemId)")
    public Item getItemById(@PathVariable Long itemId) {
        Item item = itemService.getItemById(itemId);
        if (item == null) {
            throw new NotFoundError("Item not found");
        }
        return item;
    }

    @GetMapping("/auction/{auctionId}")
    @PreAuthorize("@ItemSecurity.isOwnerorAdminorAuctionCreatorORParticipant(authentication, #auctionId)")
    public List<Item> getItemByAuctionId(@PathVariable Long auctionId) {
        return itemService.getItemByAuctionId(auctionId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('create_item')")
    public Item createNewItem(@Valid @RequestBody ItemCreateRequest request) {
        return itemService.createNewItem(request);
    }

    @PutMapping("/{itemId}")
    @PreAuthorize("@ItemSecurity.isItemOwnerOrAdmin(authentication, #itemId)")
    public Item updateItemData(@PathVariable Long itemId, @Valid @RequestBody ItemUpdateRequest request) {
        Item updatedItem = itemService.updateItem(itemId, request);

        if (updatedItem == null) {
            throw new NotFoundError("Item not found or unauthorized");
        }

        return updatedItem;
    }

    @DeleteMapping("/{itemId}")
    @PreAuthorize("@ItemSecurity.isItemOwnerOrAdmin(authentication, #itemId)")
    public void deleteItem(@PathVariable Long itemId) {
        boolean success = itemService.deleteItem(itemId);

        if (!success) {
            throw new NotFoundError("Item not found or unauthorized");
        }
    }
}
