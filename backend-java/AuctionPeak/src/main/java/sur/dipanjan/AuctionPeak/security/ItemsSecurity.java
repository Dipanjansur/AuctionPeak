package sur.dipanjan.AuctionPeak.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import sur.dipanjan.AuctionPeak.repository.AuctionRepository;
import sur.dipanjan.AuctionPeak.repository.ItemRepository;

@Component("ItemSecurity")
@RequiredArgsConstructor
public class ItemsSecurity {

    private final ItemRepository itemRepository;
    private final AuctionRepository auctionRepository;

    @Transactional(readOnly = true)
    public boolean isItemOwnerOrAdmin(Authentication authentication, Long itemId) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        boolean isAdmin = authentication.getAuthorities().contains(
                new SimpleGrantedAuthority("ROLE_ADMIN"));

        if (isAdmin) {
            return true;
        }
        return itemRepository.findById(itemId)
                .map(item -> item.getOwner().getUsername().equals(authentication.getName()))
                .orElse(false);
    }

    @Transactional(readOnly = true)
    public boolean isOwnerorAdminorAuctionCreatorORParticipant(Authentication authentication, Long auctionId) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        boolean isAdmin = authentication.getAuthorities().contains(
                new SimpleGrantedAuthority("ROLE_ADMIN"));

        if (isAdmin) {
            return true;
        }
        return auctionRepository.findById(auctionId)
                .map(auction -> auction.getCreatedBy().getUsername().equals(authentication.getName())
                        || auction.getParticipants().stream()
                                .anyMatch(participant -> participant.getUsername().equals(authentication.getName())))
                .orElse(false);
    }

    @Transactional(readOnly = true)
    public boolean isOwnerorAdminorAuctionCreatorORParticipantBYItemId(Authentication authentication, Long ItemId) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        boolean isAdmin = authentication.getAuthorities().contains(
                new SimpleGrantedAuthority("ROLE_ADMIN"));

        if (isAdmin) {
            return true;
        }
        return itemRepository.findById(ItemId)
                .map(item -> item.getOwner().getUsername().equals(authentication.getName())
                        || item.getAuctionId().getCreatedBy().getUsername().equals(authentication.getName())
                        || item.getAuctionId().getParticipants().stream()
                                .anyMatch(participant -> participant.getUsername().equals(authentication.getName())))
                .orElse(false);
    }

}