package sur.dipanjan.AuctionPeak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sur.dipanjan.AuctionPeak.entities.Auction;
import sur.dipanjan.AuctionPeak.entities.User;

import java.util.List;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {
    List<Auction> findByCreatedBy(User user);
}
