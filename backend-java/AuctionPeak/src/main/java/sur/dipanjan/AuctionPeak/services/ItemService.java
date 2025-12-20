package sur.dipanjan.AuctionPeak.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import sur.dipanjan.AuctionPeak.entities.Auction;
import sur.dipanjan.AuctionPeak.entities.Item;
import sur.dipanjan.AuctionPeak.entities.User;
import sur.dipanjan.AuctionPeak.models.ItemCreateRequest;
import sur.dipanjan.AuctionPeak.models.ItemUpdateRequest;
import sur.dipanjan.AuctionPeak.repository.AuctionRepository;
import sur.dipanjan.AuctionPeak.repository.ItemRepository;
import sur.dipanjan.AuctionPeak.services.customExceptions.ForbiddenError;
import sur.dipanjan.AuctionPeak.services.customExceptions.NotFoundError;
import sur.dipanjan.AuctionPeak.services.customExceptions.UnauthorizedError;
import sur.dipanjan.AuctionPeak.repository.UserRepository;

import java.util.List;

@Service
public class ItemService {
    private static final Logger LOGGER= LoggerFactory.getLogger(ItemService.class);

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private UserRepository userRepository;

    private User getAuthenticatedUser() {
        Authentication authentication = org.springframework.security.core.context.SecurityContextHolder.getContext()
                .getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()
                || authentication.getPrincipal().equals("anonymousUser")) {
            throw new UnauthorizedError("User is not authenticated");
        }
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UnauthorizedError("User not found"));
    }

    public List<Item> getAllItems(String query) {
        Authentication authentication = org.springframework.security.core.context.SecurityContextHolder.getContext()
                .getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) {
            return itemRepository.findAll();
        }
        User user = getAuthenticatedUser();
        return itemRepository.findByOwner(user);
    }

    public List<Item> getItemByAuctionId(Long auctionId) {
        Auction auction = auctionRepository.findById(auctionId).orElse(null);
        if (auction == null)
            return null;

        return itemRepository.findByAuctionId(auction);
    }

    public Item getItemById(Long itemId) {
        return itemRepository.findById(itemId).orElse(null);
    }

    public Item createNewItem(ItemCreateRequest request) {
        User user = getAuthenticatedUser();

        Item item = new Item();
        item.setItemName(request.getItemName());
        item.setBio(request.getBio());
        item.setStatus(request.getStatus());
        item.setItemDescription(request.getItemDescription());
        item.setCurrentPrice(request.getCurrentPrice());
        item.setOwner(user);

        return itemRepository.save(item);
    }

    public Item updateItem(Long itemId, ItemUpdateRequest request) {
        // Authorization check is handled by @PreAuthorize in the controller
        Item item = itemRepository.findById(itemId).orElse(null);
        if (item == null)
            return null;

        if (request.getItemName() != null)
            item.setItemName(request.getItemName());
        if (request.getBio() != null)
            item.setBio(request.getBio());
        if (request.getStatus() != null)
            item.setStatus(request.getStatus());
        if (request.getItemDescription() != null)
            item.setItemDescription(request.getItemDescription());
        if (request.getCurrentPrice() != null)
            item.setCurrentPrice(request.getCurrentPrice());

        return itemRepository.save(item);
    }

    public boolean deleteItem(Long itemId) {
        // Authorization check is handled by @PreAuthorize in the controller
        Item item = itemRepository.findById(itemId).orElse(null);
        if (item == null)
            return false;

        itemRepository.delete(item);
        return true;
    }
}
