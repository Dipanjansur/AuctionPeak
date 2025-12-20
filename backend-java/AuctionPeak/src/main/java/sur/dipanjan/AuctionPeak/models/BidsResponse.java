package sur.dipanjan.AuctionPeak.models;

import lombok.Data;

@Data
public class BidsResponse {

    private Long bidsId;
    private Float amount;

    // User Relation
    private UsersResponse user;
    private Long userId;
    private String username;

    // Item Relation
    private ItemsResponse item;
    private Long itemId;
    private String itemName;
}
