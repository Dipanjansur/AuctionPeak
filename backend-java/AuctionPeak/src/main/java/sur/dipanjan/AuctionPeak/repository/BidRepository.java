package sur.dipanjan.AuctionPeak.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sur.dipanjan.AuctionPeak.entities.Bid;
import sur.dipanjan.AuctionPeak.entities.User;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findByUserId(User userId);
}
