package sur.dipanjan.AuctionPeak.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Data;

@Entity
@Table(name = "bids")
@Data
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "bids_id")
    private Long bidsId;

    @Column(name = "amount", nullable = false)
    private Float amount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id")
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bids_item_id")
    private Item itemId;

    private LocalDateTime bidTime;

}