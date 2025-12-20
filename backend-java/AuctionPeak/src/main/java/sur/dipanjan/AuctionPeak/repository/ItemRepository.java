package sur.dipanjan.AuctionPeak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sur.dipanjan.AuctionPeak.entities.Auction;
import sur.dipanjan.AuctionPeak.entities.Item;
import sur.dipanjan.AuctionPeak.entities.User;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    java.util.List<Item> findByAuctionId(Auction auction);

    java.util.List<Item> findByOwner(User owner);
}
