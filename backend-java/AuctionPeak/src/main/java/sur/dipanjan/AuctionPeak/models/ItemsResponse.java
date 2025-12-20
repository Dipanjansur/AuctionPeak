package sur.dipanjan.AuctionPeak.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import sur.dipanjan.AuctionPeak.entities.ItemStatus;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ItemsResponse {

    private Long itemId;
    private String itemName;
    private String itemDescription;
    private Double currentPrice;
    private String bio;
    private ItemStatus status;
    private String pics;

    // Auction Relation
    private AuctionResponse auction;
    private Long auctionId;
    private String auctionName;

    // Owner Relation (User)
    private UsersResponse owner;
    private Long ownerId;
    private String ownerName;

    // Bids Relation
    private List<BidsResponse> bids;
    private List<Long> bidIds;
}
