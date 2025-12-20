package sur.dipanjan.AuctionPeak.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "items")
@Data
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "item_name", nullable = false)
    private String itemName;

    @Column(name = "item_description", columnDefinition = "TEXT")
    private String itemDescription;

    @Column(name = "current_price", nullable = false)
    private Double currentPrice;

    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ItemStatus status;

    @Column(name = "pics")
    private String pics;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_auction_id", referencedColumnName = "auction_id")
    private Auction auctionId;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "itemId")
    private Set<Bid> bidsforItem;

    private LocalDateTime bidStartTime;

    private LocalDateTime bidEndTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", referencedColumnName = "users_id")
    private User owner;

}