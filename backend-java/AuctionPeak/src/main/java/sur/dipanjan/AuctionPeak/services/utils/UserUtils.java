package sur.dipanjan.AuctionPeak.services.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import sur.dipanjan.AuctionPeak.entities.User;
import sur.dipanjan.AuctionPeak.repository.UserRepository;
import sur.dipanjan.AuctionPeak.services.customExceptions.UnauthorizedError;

@Component
public class UserUtils {

    @Autowired
    private UserRepository userRepository;

    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()
                || authentication.getPrincipal().equals("anonymousUser")) {
            throw new UnauthorizedError("User is not authenticated");
        }
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UnauthorizedError("User not found"));
    }
}
