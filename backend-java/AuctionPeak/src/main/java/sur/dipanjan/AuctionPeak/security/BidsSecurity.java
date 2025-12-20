package sur.dipanjan.AuctionPeak.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import sur.dipanjan.AuctionPeak.repository.BidRepository;

@Component("BidsSecurity")
@RequiredArgsConstructor
public class BidsSecurity {

    private final BidRepository bidRepository;

    public boolean isBidOwner(Authentication authentication, Long bidId) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        return bidRepository.findById(bidId)
                .map(bid -> bid.getUserId().getUsername().equals(authentication.getName()))
                .orElse(false);
    }

    @Transactional(readOnly = true)
    public boolean isBidOwnerOrAdmin(Authentication authentication, Long bidId) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        boolean isAdmin = authentication.getAuthorities().contains(
                new SimpleGrantedAuthority("ROLE_ADMIN"));

        if (isAdmin) {
            return true;
        }
        return bidRepository.findById(bidId)
                .map(bid -> bid.getUserId().getUsername().equals(authentication.getName()))
                .orElse(false);
    }

    @Transactional(readOnly = true)
    public boolean isBidOwnerOrAdminOrItemOwnerOrAuctionParticipant(Authentication authentication, Long bidId) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        boolean isAdmin = authentication.getAuthorities().contains(
                new SimpleGrantedAuthority("ROLE_ADMIN"));

        if (isAdmin) {
            return true;
        }
        return bidRepository.findById(bidId)
                .map(bid -> bid.getUserId().getUsername().equals(authentication.getName())
                        || bid.getItemId().getOwner().getUsername().equals(authentication.getName())
                        || (bid.getItemId().getAuctionId() != null &&
                                (bid.getItemId().getAuctionId().getCreatedBy().getUsername()
                                        .equals(authentication.getName())
                                        || bid.getItemId().getAuctionId().getParticipants().stream()
                                                .anyMatch(participant -> participant.getUsername()
                                                        .equals(authentication.getName())))))
                .orElse(false);
    }
}
