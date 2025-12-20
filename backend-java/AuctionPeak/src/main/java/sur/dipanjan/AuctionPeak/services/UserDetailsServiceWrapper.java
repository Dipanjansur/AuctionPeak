package sur.dipanjan.AuctionPeak.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Component;

import jakarta.transaction.Transactional;
import sur.dipanjan.AuctionPeak.entities.User;
import sur.dipanjan.AuctionPeak.repository.UserRepository;

@Component
public class UserDetailsServiceWrapper implements UserDetailsService {
    private UserRepository userRepository;

    public UserDetailsServiceWrapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameWithRolesAndPermissions(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.getUsersRoles().size();
        user.getUsersRoles().forEach(role -> role.getPermissions().size());

        return new UserDetailsWrapper(user);
    }
}
