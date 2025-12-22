package sur.dipanjan.AuctionPeak.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import sur.dipanjan.AuctionPeak.entities.Bid;
import sur.dipanjan.AuctionPeak.entities.Item;
import sur.dipanjan.AuctionPeak.entities.User;
import sur.dipanjan.AuctionPeak.models.BidCreateRequest;
import sur.dipanjan.AuctionPeak.models.BidUpdateRequest;
import sur.dipanjan.AuctionPeak.repository.BidRepository;
import sur.dipanjan.AuctionPeak.repository.ItemRepository;

import sur.dipanjan.AuctionPeak.services.customExceptions.ForbiddenError;
import sur.dipanjan.AuctionPeak.services.customExceptions.NotFoundError;
import sur.dipanjan.AuctionPeak.services.utils.UserUtils;

import java.util.List;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserUtils userUtils;

    public List<Bid> getAllBids() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) {
            return bidRepository.findAll();
        }
        User user = userUtils.getAuthenticatedUser();
        return bidRepository.findByUserId(user);
    }

    public Bid getBidById(Long bidId) {
        return bidRepository.findById(bidId)
                .orElseThrow(() -> new NotFoundError("Bid not found"));
    }

    public Bid createNewBid(BidCreateRequest request) {
        User user = userUtils.getAuthenticatedUser();

        Item item = itemRepository.findById(request.getItemId())
                .orElseThrow(() -> new NotFoundError("Item not found"));

        if (item.getOwner() != null && item.getOwner().getUsersId().equals(user.getUsersId())) {
            throw new ForbiddenError("Insufficient permissions to create bid");
        }

        Bid bid = new Bid();
        bid.setAmount(request.getAmount());
        bid.setItemId(item);
        bid.setUserId(user);

        return bidRepository.save(bid);
    }

    public Bid updateBid(Long bidId, BidUpdateRequest request) {
        // Authorization check is handled by @PreAuthorize in the controller
        Bid bid = bidRepository.findById(bidId).orElse(null);
        if (bid == null) {
            throw new NotFoundError("Bid not found");
        }

        if (request.getAmount() != null) {
            bid.setAmount(request.getAmount());
        }

        return bidRepository.save(bid);
    }

    public boolean deleteBid(Long bidId) {
        // Authorization check is handled by @PreAuthorize in the controller
        Bid bid = bidRepository.findById(bidId).orElse(null);
        if (bid == null) {
            return false;
        }

        bidRepository.delete(bid);
        return true;
    }
}
