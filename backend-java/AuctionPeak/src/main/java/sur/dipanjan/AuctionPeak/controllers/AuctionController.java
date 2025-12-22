package sur.dipanjan.AuctionPeak.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import sur.dipanjan.AuctionPeak.models.AuctionCreateRequest;
import sur.dipanjan.AuctionPeak.models.AuctionUpdateRequest;
import sur.dipanjan.AuctionPeak.models.AuctionResponse;
import sur.dipanjan.AuctionPeak.services.AuctionService;
import java.util.List;

@RestController
@RequestMapping("/auctions")
public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    @GetMapping
    @PreAuthorize("hasAuthority('VIEW_AUCTION')")
    public List<AuctionResponse> getAllAuctions() {
        return auctionService.getAllAuctions();
    }

    @GetMapping("/{auctionId}")
    @PreAuthorize("@auctionSecurity.isOwnerorAdminorParticipant(authentication, #auctionId)")
    public AuctionResponse getAuctionById(@PathVariable Long auctionId) {
        return auctionService.getAuctionById(auctionId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('create_auction')")
    public AuctionResponse createNewAuction(@Valid @RequestBody AuctionCreateRequest request) {
        return auctionService.createAuction(request);
    }

    @PutMapping("/{auctionId}")
    @PreAuthorize("@auctionSecurity.isOwnerOrAdmin(authentication, #auctionId)")
    public AuctionResponse updateAuctionData(@PathVariable Long auctionId,
            @Valid @RequestBody AuctionUpdateRequest request) {
        return auctionService.updateAuction(auctionId, request);
    }

    @DeleteMapping("/{auctionId}")
    @PreAuthorize("@auctionSecurity.isOwnerOrAdmin(authentication, #auctionId)")
    public void deleteAuction(@PathVariable Long auctionId) {
        auctionService.deleteAuction(auctionId);
    }
}
