package sur.dipanjan.AuctionPeak.services;

import org.jspecify.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import sur.dipanjan.AuctionPeak.entities.Role;
import sur.dipanjan.AuctionPeak.entities.User;
import sur.dipanjan.AuctionPeak.entities.Permission;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import sur.dipanjan.AuctionPeak.config.UserStatusConfig;

public class UserDetailsWrapper implements UserDetails {
    private final static Logger LOGGER = LoggerFactory.getLogger(UserDetailsWrapper.class);
    private final User user;

    public UserDetailsWrapper(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<Role> userrole = user.getUsersRoles();
        if (user.getUsersRoles() == null) {
            return Collections.emptyList();
        }
        return user.getUsersRoles().stream()
                .flatMap(role -> Stream.concat(
                        Stream.of(new SimpleGrantedAuthority(
                                role.getName().startsWith("ROLE_") ? role.getName() : "ROLE_" + role.getName()
                        )),
                        role.getPermissions().stream()
                                .map(permission -> new SimpleGrantedAuthority(permission.getPermissionName()))
                ))
                .collect(Collectors.toList());
    }

    @Override
    public @Nullable String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return !UserStatusConfig.EXPIRED_ACCOUNT_IDS.contains(user.getUsersId());
    }

    @Override
    public boolean isAccountNonLocked() {
        return !UserStatusConfig.LOCKED_IDS.contains(user.getUsersId());
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return !UserStatusConfig.EXPIRED_CREDENTIALS_IDS.contains(user.getUsersId());
    }

    @Override
    public boolean isEnabled() {
        return !UserStatusConfig.DISABLED_ACCOUNT_IDS.contains(user.getUsersId());
    }
}
