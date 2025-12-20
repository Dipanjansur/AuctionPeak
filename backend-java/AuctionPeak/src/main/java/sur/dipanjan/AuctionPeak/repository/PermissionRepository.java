package sur.dipanjan.AuctionPeak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sur.dipanjan.AuctionPeak.entities.Permission;
import java.util.UUID;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
}
