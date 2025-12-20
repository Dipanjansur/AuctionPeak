package sur.dipanjan.AuctionPeak.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "auctions")
@Getter
@Setter
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "auction_id")
    private Long auctionId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "auction_details", columnDefinition = "TEXT")
    private String auctionDetails;

    @Enumerated(EnumType.STRING)
    @Column(name = "is_premium")
    private PremiumStatus isPremium;

    @Column(name = "auction_pic", length = 100)
    private String auctionPic;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "auctionId")
    private Set<Item> auctionedItems;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "auction_participants", joinColumns = @JoinColumn(name = "auction_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> participants;

}