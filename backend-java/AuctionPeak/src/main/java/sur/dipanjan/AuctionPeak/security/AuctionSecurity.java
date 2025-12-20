package sur.dipanjan.AuctionPeak.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import sur.dipanjan.AuctionPeak.repository.AuctionRepository;

@Component("auctionSecurity")
@RequiredArgsConstructor
public class AuctionSecurity {

    private final AuctionRepository auctionRepository;

    @Transactional(readOnly = true)
    public boolean isOwnerOrAdmin(Authentication authentication, Long auctionId) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        boolean isAdmin = authentication.getAuthorities().contains(
                new SimpleGrantedAuthority("ROLE_ADMIN"));

        if (isAdmin) {
            return true;
        }
        return auctionRepository.findById(auctionId)
                .map(auction -> auction.getCreatedBy().getUsername().equals(authentication.getName()))
                .orElse(false);

    }

    @Transactional(readOnly = true)
    public boolean isOwnerorAdminorParticipant(Authentication authentication, Long auctionId) {
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
}