package sur.dipanjan.AuctionPeak.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class UserStatusConfig {

    public static Set<Long> LOCKED_IDS = Collections.emptySet();
    public static Set<Long> EXPIRED_ACCOUNT_IDS = Collections.emptySet();
    public static Set<Long> EXPIRED_CREDENTIALS_IDS = Collections.emptySet();
    public static Set<Long> DISABLED_ACCOUNT_IDS = Collections.emptySet();

    @Value("${users.ids.locked:}")
    private String lockedIdsStr;

    @Value("${users.ids.expired:}")
    private String expiredAccountIdsStr;

    @Value("${users.ids.credentials-expired:}")
    private String expiredCredentialsIdsStr;

    @Value("${users.ids.disabled:}")
    private String disabledAccountIdsStr;

    @PostConstruct
    public void init() {
        LOCKED_IDS = parseIds(lockedIdsStr);
        EXPIRED_ACCOUNT_IDS = parseIds(expiredAccountIdsStr);
        EXPIRED_CREDENTIALS_IDS = parseIds(expiredCredentialsIdsStr);
        DISABLED_ACCOUNT_IDS = parseIds(disabledAccountIdsStr);
    }

    private Set<Long> parseIds(String ids) {
        if (ids == null || ids.trim().isEmpty()) {
            return Collections.emptySet();
        }
        return Stream.of(ids.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(Long::valueOf)
                .collect(Collectors.toSet());
    }
}
