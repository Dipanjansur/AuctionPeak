package sur.dipanjan.AuctionPeak.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import sur.dipanjan.AuctionPeak.entities.PremiumStatus;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UsersResponse {

    private Long usersId;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String bio;
    private PremiumStatus isPremium;
    private String profilepic;

    // Roles Relation
    private List<String> roleNames;
    private List<Long> roleIds;

    // Participated Auctions Relation
    private List<AuctionResponse> participatedAuctionsDetails;
    private List<LazyAuctionResponse> participatedAuctions;

    // Created Auctions Relation
    private List<AuctionResponse> createdAuctionsDetails;
    private List<LazyAuctionResponse> createdAuctions;

    // Owned Items Relation
    private List<ItemsResponse> ownedItemsDetails;
    private List<LazyAuctionItemsResponse> ownedItems;

    @Data
    public static class LazyAuctionItemsResponse {
        private Long itemId;
        private String itemName;
    }

    @Data
    public static class LazyAuctionResponse {
        private Long auctionId;
        private String auctionName;
    }
}
