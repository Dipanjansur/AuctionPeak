package sur.dipanjan.AuctionPeak.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sur.dipanjan.AuctionPeak.entities.Bid;
import sur.dipanjan.AuctionPeak.models.BidCreateRequest;
import sur.dipanjan.AuctionPeak.models.BidUpdateRequest;
import sur.dipanjan.AuctionPeak.services.BidService;
import sur.dipanjan.AuctionPeak.services.customExceptions.NotFoundError;

import java.util.List;

@RestController
@RequestMapping("/bids")
public class BidController {

    @Autowired
    private BidService bidService;

    @GetMapping
    @PreAuthorize("hasAuthority('view_bid')")
    public List<Bid> getAllBids() {
        return bidService.getAllBids();
    }

    @GetMapping("/{bidId}")
    @PreAuthorize("@BidsSecurity.isBidOwnerOrAdminOrItemOwnerOrAuctionParticipant(authentication, #bidId)")
    public Bid getBidById(@PathVariable Long bidId) {
        return bidService.getBidById(bidId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('create_bid')")
    public Bid createNewBid(@Valid @RequestBody BidCreateRequest request) {
        return bidService.createNewBid(request);
    }

    @PutMapping("/{bidId}")
    @PreAuthorize("@BidsSecurity.isBidOwner(authentication, #bidId)")
    public Bid updateBid(@PathVariable Long bidId, @Valid @RequestBody BidUpdateRequest request) {
        return bidService.updateBid(bidId, request);
    }

    @DeleteMapping("/{bidId}")
    @PreAuthorize("@BidsSecurity.isBidOwnerOrAdmin(authentication, #bidId)")
    public void deleteBid(@PathVariable Long bidId) {
        boolean success = bidService.deleteBid(bidId);
        if (!success) {
            throw new NotFoundError("Bid not found");
        }
    }
}
